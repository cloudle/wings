function reporter(middlewareOptions, options) {
	const { log, state, stats, } = options;

	if (state) {
		const displayStats = middlewareOptions.stats !== false,
			statsString = stats.toString(middlewareOptions.stats);

		if (displayStats && statsString.trim().length) {
			if (stats.hasErrors()) {
				log.error(statsString);
			} else if (stats.hasWarnings()) {
				log.warn(statsString);
			} else {
				log.info(statsString);
			}
		}

		let message = 'Compiled successfully.';

		if (stats.hasErrors()) {
			message = 'Failed to compile.';
		} else if (stats.hasWarnings()) {
			message = 'Compiled with warnings.';
		}

		log.info(message);
	} else {
		console.log('Compiling...');
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
		quiet: !optimizeMode,
		noInfo: !optimizeMode,
		overlay: true,
	};
};
