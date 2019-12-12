import { fork, } from 'child_process';
import { defaultWebpackMiddleware, defaultDevServerMiddleware, } from './middlewares';
import { extractGlobalModules } from './utils';

function run() {
	const globalModules = extractGlobalModules(),
		{ wingsConfig, webpack, devServer, babelLoader } = globalModules,
		{ webpackMiddleWares, devServerMiddleWares, host: getHost, port: getPort, } = wingsConfig,
		host = getHost(),
		port = getPort();

	console.log(babelLoader);

	webpackMiddleWares.unshift(defaultWebpackMiddleware);
	devServerMiddleWares.unshift(defaultDevServerMiddleware);

	let webpackConfig, devServerConfig;

	for (let i = 0; i < webpackMiddleWares.length; i += 1) {
		const currentMiddleware = webpackMiddleWares[i],
			nextConfig = currentMiddleware(webpackConfig, globalModules);

		if (nextConfig) {
			webpackConfig = nextConfig;
		} else {
			break;
		}
	}

	for (let i = 0; i < devServerMiddleWares.length; i += 1) {
		const currentMiddleware = devServerMiddleWares[i],
			nextConfig = currentMiddleware(devServerConfig, globalModules);

		if (nextConfig) {
			devServerConfig = nextConfig;
		} else {
			break;
		}
	}

	const compiler = webpack(webpackConfig);
	const developmentServer = new devServer(compiler, devServerConfig);
	developmentServer.listen(port, host, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Server ready!');
		}
	});
}

run();
