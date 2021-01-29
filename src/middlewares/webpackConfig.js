import { resolve, } from 'path';
import { isArray, } from 'lodash';
import {
	guessEntry,
	moduleExist,
	optionsToQueryString,
	requireModule,
	resolveModule,
	checkForUpdates,
} from '../utils/helper';

function getEntries(configuredEntry) {
	if (configuredEntry) {
		return isArray(configuredEntry) ? configuredEntry : [configuredEntry];
	}

	return [guessEntry()];
}

export const defaultWebpackConfigMiddleware = (config, globals) => {
	let brightFlag = false, initialBuild = true;
	const {
		wingsConfig,
		appJson,
		buildJson,
		webpack,
		htmlPlugin,
		progressBarPlugin,
		chalk,
	} = globals;
	const appEntries = getEntries(wingsConfig.entries);
	const env = wingsConfig.env();
	const isProduction = wingsConfig.isProduction(env);
	const alias = wingsConfig.moduleAlias(isProduction);
	const publicPath = wingsConfig.publicPath(isProduction, env);
	const conditionalPlugins = isProduction ? [] : [
		new webpack.HotModuleReplacementPlugin(),
	];
	const reactAvailable = moduleExist('react');
	const hotQueryString = optionsToQueryString(wingsConfig.hotOptions);
	const hotMiddlewareClientSrc = resolve(__dirname, '../../node_modules', `webpack-hot-middleware/client${hotQueryString}`);
	const hot = [hotMiddlewareClientSrc];
	const babelPlugins = [];

	if (!isProduction && reactAvailable) {
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
			alias: { ...alias.global, ...alias.web, },
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
			new progressBarPlugin({
				width: 18,
				complete: '#',
				incomplete: chalk.gray('#'),
				format: `${chalk.gray('｢')}${chalk.blue('build')}${chalk.gray('｣')} [:bar] ${chalk.gray('(:elapsed seconds)')}`,
				summary: false,
				customSummary: (time) => {
					const buildTime = `${time.substring(0, time.length - 1)}${chalk.gray('s')}`;
					const alternatedColor = brightFlag ? (x => x) : chalk.gray;
					const ruuiBullet = `${chalk.gray('｢')}${alternatedColor('wings')}${chalk.gray('｣')}`;
					const buildType = initialBuild ? 'initial build' : 'hot module update';
					const buildFlag = isProduction ? 'production bundle' : buildType;

					if (!isProduction && initialBuild) checkForUpdates();
					console.log(ruuiBullet, chalk.gray(`${buildFlag} ${chalk.green('completed')} after`), buildTime);
					brightFlag = !brightFlag;
					initialBuild = false;
				},
			}),
			...conditionalPlugins,
		],
	};
};
