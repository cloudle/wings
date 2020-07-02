import { defaultDevConfigMiddleware, defaultWebpackConfigMiddleware, } from '../middlewares';
import { extractGlobalModules, } from '../utils';
import { createDevServer, createNodeServer, } from '../utils/server';

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
	handler: async (args) => {
		const globalModules = extractGlobalModules();
		const { wingsConfig, wingsHelper, webpack, } = globalModules;
		const { requireModule, } = wingsHelper;
		const { webpackConfigs, devConfigs, } = wingsConfig;
		const host = wingsConfig.host(args.host);
		const port = wingsConfig.port(args.port);
		const ssrPort = wingsConfig.ssrPort(args['ssr-port']);
		const nodeEntry = requireModule('index.node.js');

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

		const compiler = webpack(webpackConfig);
		const devServer = await createDevServer(globalModules, compiler, devConfig);

		devServer.listen(port, host, (error) => {
			if (error) {
				console.log(error);
			} else {
				console.log('Server ready!', host, port);
			}
		});

		if (nodeEntry) {
			const nodeServer = await createNodeServer(nodeEntry, globalModules, compiler, devConfig);

			nodeServer.listen(ssrPort, host, (error) => {
				if (error) {
					console.log(error);
				} else {
					console.log('Node server ready!', host, ssrPort);
				}
			});
		}
	},
};
