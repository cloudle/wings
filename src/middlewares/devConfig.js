
export const defaultDevConfigMiddleware = (config, globals) => {
	const { wingsConfig, } = globals,
		{ publicPath, port: getPort, optimizeMode: getOptimizeMode, } = wingsConfig,
		port = getPort(),
		optimizeMode = getOptimizeMode();

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
		stats: {
			all: true,
			assets: optimizeMode,
			colors: true,
			version: true,
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
