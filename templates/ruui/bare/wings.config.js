const emptyWebpackMiddleware = (webpackConfig, globalModules) => {
	return webpackConfig;
};

module.exports = {
	webpackConfigs: [emptyWebpackMiddleware],
	moduleAlias: (isProduction) => {
		return {
			global: {
				'react-native': 'react-native-web',
			},
		};
	},
};
