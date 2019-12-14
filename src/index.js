import { fork, } from 'child_process';
import { defaultWebpackConfigMiddleware, defaultDevConfigMiddleware, } from './middlewares';
import { extractGlobalModules, } from './utils';
import { createDevServer, } from './utils/server';

function run() {
	const globalModules = extractGlobalModules(),
		{ wingsConfig, webpack, express, devServer, babelLoader } = globalModules,
		{ webpackConfigs, devConfigs, host: getHost, port: getPort, } = wingsConfig,
		host = getHost(),
		port = getPort();

	webpackConfigs.unshift(defaultWebpackConfigMiddleware);
	devConfigs.unshift(defaultDevConfigMiddleware);

	let webpackConfig, devConfig;

	for (let i = 0; i < webpackConfigs.length; i += 1) {
		const currentMiddleware = webpackConfigs[i],
			nextConfig = currentMiddleware(webpackConfig, globalModules);

		if (nextConfig) {
			webpackConfig = nextConfig;
		} else {
			break;
		}
	}

	for (let i = 0; i < devConfigs.length; i += 1) {
		const currentMiddleware = devConfigs[i],
			nextConfig = currentMiddleware(devConfig, globalModules);

		if (nextConfig) {
			devConfig = nextConfig;
		} else {
			break;
		}
	}

	const compiler = webpack(webpackConfig),
		developmentServer = createDevServer(globalModules, compiler, devConfig);

	developmentServer.listen(port, host, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Server ready!', host, port);
		}
	});
}

run();
