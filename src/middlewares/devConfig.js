import { extractGlobalModules, } from '../utils';

function reporter(middlewareOptions, options) {
	const globalModules = extractGlobalModules();
	const { chalk, } = globalModules;
	const { log, state, stats, } = options;

	if (state) {
		const { warnings, errors, hash, emittedAssets, outputOptions, } = stats?.compilation;
		const publicPath = outputOptions?.publicPath;
		const displayStats = middlewareOptions.stats !== false;
		const statsString = stats.toString(middlewareOptions.stats);

		if (displayStats && statsString.trim().length) {
			if (stats.hasErrors()) {
				const formattedError = chalk.red(`error${errors.length > 1 ? 's' : ''}`);

				console.log(`${chalk.gray('｢wings｣')} with ${chalk.yellow(errors.length)} ${formattedError}:`);
				console.log(errors.toString());
			} else if (stats.hasWarnings()) {
				const formattedWarning = chalk.yellow(`warning${errors.length > 1 ? 's' : ''}`);
				console.log(`${chalk.gray('｢wings｣')} with ${warnings.length} ${formattedWarning}`);
				console.log(warnings.toString());
			}
		}
	}
}

export const defaultDevConfigMiddleware = (config, globals) => {
	const { wingsConfig, } = globals;
	const env = wingsConfig.env();
	const isProduction = wingsConfig.isProduction(env);
	const publicPath = wingsConfig.publicPath(isProduction, env);
	const port = wingsConfig.port();
	const optimizeMode = wingsConfig.optimizeMode();

	return {
		publicPath,
		port,
		contentBase: 'wings',
		hot: true,
		historyApiFallback: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
		},
		reporter,
		stats: {
			context: process.cwd(),
			all: true,
			assets: optimizeMode,
			colors: true,
			version: optimizeMode,
			hash: optimizeMode,
			timings: true,
			chunks: optimizeMode,
			performance: optimizeMode,
			modules: optimizeMode,
			moduleTrace: optimizeMode,
			modulesSort: 'size',
			chunkModules: optimizeMode,
			chunkOrigins: optimizeMode,
			cached: true,
			error: true,
			cachedAssets: optimizeMode,
		},
		clientLogLevel: 'silent',
		// quiet: !optimizeMode,
		noInfo: !optimizeMode,
		overlay: true,
	};
};
