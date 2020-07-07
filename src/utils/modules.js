import {resolve, } from 'path';
import { v4 as uuid, } from 'uuid';
import * as wingsHelper from './helper';

const { requireModule, getEjsTemplate, } = wingsHelper;

export const extractGlobalModules = () => {
	const wingsConfig = requireModule('wings.config.js') || {},
		appJson = requireModule('app.json') || defaultAppJson,
		buildJson = requireModule('wings/build.json'),
		modules = { wingsConfig, wingsHelper, appJson, buildJson, },
		extraModules = wingsConfig.resolves || {},
		globalModuleMap = {
			chalk: 'node_modules/chalk',
			webpack: 'node_modules/webpack',
			express: 'node_modules/express',
			babelLoader: 'node_modules/babel-loader',
			progressBarPlugin: 'node_modules/progress-bar-webpack-plugin',
			htmlPlugin: 'node_modules/html-webpack-plugin',
			devServer: 'node_modules/webpack-dev-server',
			...extraModules,
		};

	Object.keys(defaultWingsConfig).forEach((key) => {
		if (!wingsConfig[key]) {
			wingsConfig[key] = defaultWingsConfig[key];
		}
	});

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
	output: resolve(process.cwd()),
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
