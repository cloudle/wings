import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

export const createDevServer = (globals, compiler, devOptions) => {
	const { wingsConfig, webpack, express } = globals,
		{ ejsTemplate, publicPath, isProduction: checkProduction, env: getEnv, } = wingsConfig,
		env = getEnv(),
		isProduction = checkProduction(env),
		server = express();

	if (!isProduction) {
		server.use(devMiddleware(compiler, devOptions));

		server.use(hotMiddleware(compiler, {
			log: false,
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
