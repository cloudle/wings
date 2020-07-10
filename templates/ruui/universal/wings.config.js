const emptyWebpackMiddleware = (webpackConfig, globalModules) => {
	return webpackConfig;
};

module.exports = {
	webpackConfigs: [emptyWebpackMiddleware],
	publicPath: (isProduction) => isProduction ? '/' : 'http://localhost:3000/',
};
