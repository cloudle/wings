import { fork, } from 'child_process';
import { resolve, } from 'path';
import { defaultDevConfigMiddleware, defaultWebpackConfigMiddleware, } from '../middlewares';
import { extractGlobalModules, } from '../utils';
import packageInfo from '../../package.json';

export default {
	command: '$0',
	aliases: ['up', 'dev', 'run'],
	desc: 'start development environment',
	usage: '',
	builder: (yargs) => {
		return yargs.options(upOptions)
			.group(Object.keys(upOptions), '[up] Options:');
	},
	handler: async (args) => {
		const globalModules = extractGlobalModules();
		const { wingsConfig, wingsHelper, webpack, DevServer, chalk, } = globalModules;
		const { guessEntry, webEntries, nodeEntries, } = wingsHelper;
		const { webpackConfigs, devConfigs, } = wingsConfig;
		const host = wingsConfig.host(args.host);
		const webEntry = guessEntry(webEntries);
		const nodeEntry = guessEntry(nodeEntries);

		console.log(chalk.gray('｢wings｣ cli'), chalk.magenta(`@${packageInfo.version}`));

		if (!webEntry && !nodeEntry) {
			const allEntries = [...webEntries, ...nodeEntries].join(', ');

			console.log(chalk.red('No entry found! ')
				+ 'you need at least one entry on the following list:\n'
				+ chalk.gray('[')
				+ chalk.green(allEntries)
				+ chalk.gray(']'));
		}

		if (nodeEntry) {
			const ssrPort = wingsConfig.ssrPort(args.ssrPort);
			const serverAddress = chalk.blue(`http://${host}:${ssrPort}`);

			console.log(`${chalk.gray('｢wings｣')} ${chalk.gray('•')} ${chalk.yellow('node entry')} ${chalk.green(nodeEntry)} ${chalk.gray('detected')}`);
			console.log(`${chalk.gray('       ')} ${chalk.gray('•')} ${chalk.yellow('launching')} ${serverAddress}`);

			const serverPath = resolve(__dirname, '../utils/nodeEntry.js');

			try {
				fork(serverPath, { cwd: process.cwd(), stdio: 'inherit', });
			} catch (e) {
				console.log(`｢wings｣ ${chalk.red('error during spawn')} ${chalk.green(nodeEntry)}`);
				console.log(e);
			}
		}

		if (webEntry) {
			const port = wingsConfig.port(args.port);
			const publicPath = wingsConfig.publicPath(false);
			const serverAddress = chalk.blue(`http://${host}:${port}`);

			console.log(`${chalk.gray('｢wings｣')} ${chalk.gray('•')} ${chalk.yellow('web entry')} ${chalk.green(webEntry)} ${chalk.gray('detected')}`);
			console.log(`${chalk.gray('       ')} ${chalk.gray('•')} ${chalk.yellow('launching')} ${serverAddress}`);

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
			const devServer = new DevServer(compiler, devConfig);

			devServer.listen(port, host, (error) => {
				if (error) console.log(error);
			});
		}
	},
};

const upOptions = {
	port: {
		alias: 'p',
		type: 'number',
		default: 3000,
		describe: 'Port for development server',
	},
	host: {
		alias: 'o',
		type: 'string',
		describe: 'Host/ip of the server',
	},
	ssrPort: {
		alias: 's',
		type: 'number',
		default: 3005,
		describe: 'Port for "ssr" server',
	},
	devOnly: {
		alias: 'd',
		type: 'boolean',
		describe: 'Force disable ssr',
	},
};
