import { resolve, } from 'path';
import { isArray, } from 'lodash';
import { guessEntry, } from '../utils/helper';

const hot = [
	'react-hot-loader/patch',
	'webpack-dev-server/client?#{publicPath}',
	'webpack/hot/only-dev-server',
];

function getEntries(configuredEntry) {
	if (configuredEntry) {
		return isArray(configuredEntry) ? configuredEntry : [configuredEntry];
	}

	return [guessEntry()];
}

export const defaultWebpackMiddleware = (config, globals) => {
	const { wingsConfig, appJson, buildJson, webpack, htmlPlugin, progressBarPlugin, } = globals,
		{ entries, output,  publicPath, ejsTemplate, htmlOptions, env: getEnv, } = wingsConfig,
		appEntries = getEntries(entries),
		env = getEnv(),
		isProduction = env === 'production';

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
					plugins: isProduction ? [] : ['react-hot-loader/babel']
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
		],
	};
};
