import fs from 'fs';
import { resolve, } from 'path';
import { extractGlobalModules, } from '../utils';
import { defaultWebpackConfigMiddleware, } from '../middlewares';

export default {
	command: 'bundle',
	aliases: ['build', 'compile'],
	desc: 'build production bundle',
	builder: (yargs) => {
		return yargs.options(bundleOptions)
			.group(Object.keys(bundleOptions), '[bundle] Options:');
	},
	handler: async (args) => {
		const globalModules = extractGlobalModules();
		const { wingsConfig, wingsHelper, buildJson, webpack, chalk, } = globalModules;
		const { guessEntry, webEntries, } = wingsHelper;
		const { webpackConfigs, } = wingsConfig;
		const env = wingsConfig.env();
		const staticPath = wingsConfig.staticPath(env);
		const keepPreviousBuild = wingsConfig.keepPreviousBuild(env);
		const webEntry = guessEntry(webEntries);

		if (webEntry) {
			let webpackConfig;
			console.log(`${chalk.gray('｢wings｣')} ${chalk.yellow('compile')} ${chalk.green(webEntry)} ${chalk.gray('production bundle')}`);
			['ENV', 'NODE_ENV', ].forEach((key) => {
				process.env[key] = 'production'; /* simulate Production environment */
			});

			webpackConfigs.unshift(defaultWebpackConfigMiddleware);

			for (let i = 0; i < webpackConfigs.length; i += 1) {
				const currentMiddleware = webpackConfigs[i],
					nextConfig = currentMiddleware(webpackConfig, globalModules);

				if (nextConfig) {
					webpackConfig = nextConfig;
				} else {
					break;
				}
			}

			const compiler = webpack(webpackConfig);

			compiler.run((error, stats) => {
				if (error) { console.log(error); return; }
				const lastBuildPath = resolve(process.cwd(), `${staticPath}/${buildJson.buildId}.js`);

				if (!keepPreviousBuild && fs.existsSync(lastBuildPath)) {
					fs.unlinkSync(lastBuildPath);
					console.log(`${chalk.gray('｢wings｣')} ${chalk.gray('clean up previous build')} ${chalk.red(buildJson.buildId)}${chalk.gray('.js')}`);
				}
			});
		}
	},
};

const bundleOptions = {
	hydrate: {
		alias: 'h',
		type: 'boolean',
		default: false,
		describe: 'Hydrate pages to static HTML markup',
	},
};
