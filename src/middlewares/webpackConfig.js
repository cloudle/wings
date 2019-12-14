import { resolve, } from 'path';
import { isArray, } from 'lodash';
import { guessEntry, moduleExist, } from '../utils/helper';

function getEntries(configuredEntry) {
	if (configuredEntry) {
		return isArray(configuredEntry) ? configuredEntry : [configuredEntry];
	}

	return [guessEntry()];
}

export const defaultWebpackConfigMiddleware = (config, globals) => {
	const { wingsConfig, appJson, buildJson, webpack, htmlPlugin, progressBarPlugin, } = globals,
		{ entries, output, publicPath, ejsTemplate, htmlOptions, isProduction: checkProduction, env: getEnv, } = wingsConfig,
		appEntries = getEntries(entries),
		env = getEnv(),
		isProduction = checkProduction(env),
		conditionalPlugins = isProduction ? [] : [new webpack.HotModuleReplacementPlugin()],
		reactHotReloadAvailable = moduleExist('react-hot-loader'),
		hotMiddlewareClientSrc = resolve(__dirname, '../../node_modules', 'webpack-hot-middleware/client'),
		hot = [hotMiddlewareClientSrc],
		babelPlugins = [];

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
			path: output,
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
				template: ejsTemplate,
				filename: 'index.html',
				...htmlOptions,
			}),
			...conditionalPlugins,
		],
	};
};
