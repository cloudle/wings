const alias = require('./configurations/moduleAliases');

const emptyWebpackMiddleware = (webpackConfig, globalModules) => {
	require('./configurations/postInstallation');
	Object.assign(webpackConfig.resolve.alias, alias.shared, alias.browser);

	return webpackConfig;
};

module.exports = {
	publicPath: (isProduction) => isProduction ? '/' : 'http://localhost:3000/',
	webpackConfigs: [emptyWebpackMiddleware],
};
