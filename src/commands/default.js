import { defaultDevConfigMiddleware, defaultWebpackConfigMiddleware, } from '../middlewares';
import { extractGlobalModules, } from '../utils';
import { createDevServer } from '../utils/server';

export default {
	command: '$0',
	aliases: ['up', 'dev', 'run'],
	desc: 'start development environment',
	usage: '',
	builder: (yargs) => {
		const upOptions = {
			port: {
				alias: 'p',
				default: 3000,
				describe: 'Port for development server',
				type: 'number',
			},
			host: {
				alias: 'o',
				describe: 'Host/ip of the server',
				type: 'string',
			},
			ssrPort: {
				alias: 's',
				default: 3005,
				describe: 'Port for "ssr" server',
				type: 'number',
			},
			devOnly: {
				alias: 'd',
				describe: 'Force disable ssr',
				type: 'boolean',
			},
		};

		return yargs.options(upOptions)
			.group(Object.keys(upOptions), '[up] Options:');
	},
	handler: () => {
		const globalModules = extractGlobalModules(),
			{ wingsConfig, webpack, } = globalModules,
			{ webpackConfigs, devConfigs, host: getHost, port: getPort } = wingsConfig,
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

		developmentServer.listen(port, host, (error) => {
			if (error) {
				console.log(error);
			} else {
				console.log('Server ready!', host, port);
			}
		});
	},
};
