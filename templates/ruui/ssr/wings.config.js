const { resolve, } = require('path');

const emptyWebpackMiddleware = (webpackConfig, globalModules) => {
	return webpackConfig;
};

module.exports = {
	publicPath: (isProduction, env) => isProduction ? '/' : 'http://localhost:3000/',
	webpackConfigs: [emptyWebpackMiddleware],
	moduleAlias: (isProduction) => {
		const src = isProduction ? 'dist' : 'src';

		return {
			global: {
				'react-native': 'react-native-web',
				'react-native-linear-gradient': 'react-native-web-linear-gradient',
				'react-native-iphone-x-helper': resolve(process.cwd(), `${src}/compatible/x-helper.js`),
			},
			node: {
				'react-native-svg': resolve(process.cwd(), 'node_modules/react-native-svg/lib/commonjs/ReactNativeSVG.web.js'),
			}
		};
	},
};
