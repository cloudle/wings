const emptyWebpackMiddleware = (webpackConfig, globalModules) => {
	return webpackConfig;
};

module.exports = {
	webpackConfigs: [emptyWebpackMiddleware],
};
