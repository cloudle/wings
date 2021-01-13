import { resolve, } from 'path';
import { isArray, } from 'lodash';
import { guessEntry, moduleExist, optionsToQueryString, requireModule, resolveModule, } from '../utils/helper';
import { consoleStore, } from '../console/store';
import * as consoleActions from '../console/store/appAction';

function getEntries(configuredEntry) {
	if (configuredEntry) {
		return isArray(configuredEntry) ? configuredEntry : [configuredEntry];
	}

	return [guessEntry()];
}

function progressHandler(percentage, message, ...args) {
	consoleStore.dispatch(consoleActions.setDevProgress({
		percentage,
		message,
		args,
	}));
}

export const defaultWebpackConfigMiddleware = (config, globals) => {
	const { wingsConfig, appJson, buildJson, webpack, htmlPlugin, progressBarPlugin, } = globals;
	const appEntries = getEntries(wingsConfig.entries);
	const env = wingsConfig.env();
	const isProduction = wingsConfig.isProduction(env);
	const publicPath = wingsConfig.publicPath(isProduction, env);
	const conditionalPlugins = isProduction ? [] : [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProgressPlugin(progressHandler),
	];
	const reactRefreshAvailable = moduleExist('react-refresh');
	const reactRefreshPluginAvailable = moduleExist('@pmmmwh/react-refresh-webpack-plugin');
	const hotQueryString = optionsToQueryString(wingsConfig.hotOptions);
	const hotMiddlewareClientSrc = resolve(__dirname, '../../node_modules', `webpack-hot-middleware/client${hotQueryString}`);
	const hot = [hotMiddlewareClientSrc];
	const babelPlugins = [];

	if (!isProduction && reactRefreshAvailable && reactRefreshPluginAvailable) {
		const ReactRefreshWebpackPlugin = requireModule('node_modules/@pmmmwh/react-refresh-webpack-plugin');
		conditionalPlugins.push(new ReactRefreshWebpackPlugin());
		babelPlugins.push(resolveModule('node_modules/react-refresh/babel.js'));
	}

	return {
		context: process.cwd(),
		mode: isProduction ? 'production' : 'development',
		cache: true,
		entry: {
			app: {
				import: isProduction ? appEntries : [...hot, ...appEntries],
				filename: isProduction ? '[name].min.js' : '[name].js',
			},
		},
		optimization: {
			minimize: isProduction,
			moduleIds: 'named',
		},
		output: {
			publicPath,
			path: wingsConfig.output,
			filename: isProduction ? '[name].min.js' : '[name].js',
			chunkFilename: '[name].js',
		},
		resolveLoader: {
			modules: [
				resolve(__dirname, '../../', 'node_modules')
			],
		},
		resolve: {
			mainFields: ['browser', 'main', 'module'],
			alias: {
				'react-native': 'react-native-web',
			},
			modules: [process.cwd(), 'node_modules'],
			extensions: ['.web.js', '.js'],
		},
		module: {
			rules: [{
				test: /\.js?$/,
				loader: 'babel-loader',
				options: {
					compact: false,
					cacheDirectory: true,
					plugins: babelPlugins,
				},
			}, {
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
				],
			}, {
				test: /\.(png|jpg|svg|ttf)$/,
				loader: 'file-loader',
				options: {
					name: '[hash].[ext]',
				},
			}, ],
		},
		plugins: [
			new webpack.DefinePlugin({
				ENV: JSON.stringify(env),
				'process.env.NODE_ENV': JSON.stringify(env),
			}),
			new htmlPlugin({
				isProduction,
				publicPath,
				appName: appJson.displayName || appJson.name || 'Wings',
				template: wingsConfig.ejsTemplate,
				filename: 'index.html',
				...wingsConfig.htmlOptions,
			}),
			...conditionalPlugins,
		],
	};
};
