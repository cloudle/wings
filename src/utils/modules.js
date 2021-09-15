import { resolve, } from 'path';
import { v4 as uuid, } from 'uuid';
import * as wingsHelper from './helper';

const { requireModule, getEjsTemplate, } = wingsHelper;

export const extractGlobalModules = () => {
	const wingsConfig = requireModule('wings.config.js') || {};
	const appJson = requireModule('app.json') || defaultAppJson;
	const modules = { wingsConfig, wingsHelper, appJson, };
	const extraModules = wingsConfig.resolves || {};
	const globalModuleMap = {
		chalk: 'node_modules/chalk',
		webpack: 'node_modules/webpack',
		express: 'node_modules/express',
		babelLoader: 'node_modules/babel-loader',
		ProgressBarPlugin: 'node_modules/progress-bar-webpack-plugin',
		HtmlPlugin: 'node_modules/html-webpack-plugin',
		TerserPlugin: 'node_modules/terser-webpack-plugin',
		DevServer: 'node_modules/webpack-dev-server',
		...extraModules,
	};

	Object.keys(defaultWingsConfig).forEach((key) => {
		if (!wingsConfig[key]) {
			wingsConfig[key] = defaultWingsConfig[key];
		}
	});

	const env = wingsConfig.env();
	const staticPath = wingsConfig.staticPath(env);

	modules.buildJson = requireModule(`${staticPath}/build.json`) || {};

	Object.keys(globalModuleMap).forEach((moduleName) => {
		modules[moduleName] = requireModule(globalModuleMap[moduleName]);
	});

	return modules;
};

const defaultWingsConfig = {
	isProduction: (env) => env === 'production',
	env: () => process.env.ENV || 'development',
	host: cli => process.env.HOST || cli || 'localhost',
	port: cli => process.env.PORT || cli || 3000,
	ssrPort: cli => process.env.SSR_PORT || cli || 3005,
	optimizeMode: () => !!process.env.OPTIMIZE,
	buildId: uuid,
	moduleAlias: () => ({
		global: {},
		web: {},
		node: {},
	}),
	keepPreviousBuild: (isProduction) => false,
	buildCleanUp: () => {},
	ejsTemplate: getEjsTemplate(),
	htmlOptions: {},
	publicPath: (isProduction, env) => '/',
	staticPath: (env) => 'wings',
	webpackConfigs: [],
	devConfigs: [],
	hotOptions: { /* <- detailed config: https://github.com/webpack-contrib/webpack-hot-middleware */
		reload: true,
		quiet: true,
		path: '__webpack_hmr',
		dynamicPublicPath: true,
	},
};

const defaultAppJson = {

};
