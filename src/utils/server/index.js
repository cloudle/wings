import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

export const createDevServer = (globals, compiler, middlewareOptions) => {
	const { wingsConfig, webpack, express } = globals,
		{ ejsTemplate, publicPath, isProduction: checkProduction, env: getEnv, } = wingsConfig,
		env = getEnv(),
		isProduction = checkProduction(env),
		server = express();

	if (!isProduction) {
		server.use(devMiddleware(compiler, {
			publicPath,
		}));

		server.use(hotMiddleware(compiler, {
			reload: true,
			// path: `/__webpack_hmr`,
		}));
	}

	server.set('view engine', 'ejs');
	server.use(express.static('wings'));

	const listen = (port, host, callback) => {
		server.listen(port, host, callback);
	};

	return {
		instance: server,
		listen,
	};
};
