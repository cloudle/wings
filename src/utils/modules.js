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
	env: () => process.env.ENV || 'development',
	host: () => process.env.HOST || 'localhost',
	port: () => process.env.PORT || 3000,
	optimizeMode: () => !!process.env.OPTIMIZE,
	buildId: uuid,
	output: resolve(process.cwd(), 'wings'),
	ejsTemplate: getEjsTemplate(),
	htmlOptions: {},
	publicPath: '/',
	webpackMiddleWares: [],
	devServerMiddleWares: [],
};

const defaultAppJson = {

};
