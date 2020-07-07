import { resolve, } from 'path';
import { isArray, } from 'lodash';
import { guessEntry, moduleExist, optionsToQueryString, } from '../utils/helper';

function getEntries(configuredEntry) {
	if (configuredEntry) {
		return isArray(configuredEntry) ? configuredEntry : [configuredEntry];
	}

	return [guessEntry()];
}

export const defaultWebpackConfigMiddleware = (config, globals) => {
	const { wingsConfig, appJson, buildJson, webpack, htmlPlugin, progressBarPlugin, } = globals;
	const appEntries = getEntries(wingsConfig.entries);
	const env = wingsConfig.env();
	const isProduction = wingsConfig.isProduction(env);
	const publicPath = wingsConfig.publicPath(isProduction, env);
	const conditionalPlugins = isProduction ? [] : [new webpack.HotModuleReplacementPlugin()];
	const reactHotReloadAvailable = moduleExist('react-hot-loader');
	const hotQueryString = optionsToQueryString(wingsConfig.hotOptions);
	const hotMiddlewareClientSrc = resolve(__dirname, '../../node_modules', `webpack-hot-middleware/client${hotQueryString}`);
	const hot = [hotMiddlewareClientSrc];
	const babelPlugins = [];

	if (!isProduction && reactHotReloadAvailable) {
		hot.unshift('react-hot-loader/patch');
		babelPlugins.unshift('react-hot-loader/babel');
	}

	return {
		context: process.cwd(),
		mode: isProduction ? 'production' : 'development',
		cache: true,
		entry: {
			app: isProduction ? appEntries : [...hot, ...appEntries],
		},
		optimization: {
			minimize: isProduction,
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
				'react-dom': '@hot-loader/react-dom',
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
				loader: 'style-loader!css-loader',
			}, {
				test: /\.(png|jpg|svg|ttf)$/,
				loader: 'file-loader?name=[name].[ext]',
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
