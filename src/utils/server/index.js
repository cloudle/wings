import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

export async function createDevServer(globals, compiler, devOptions) {
	const { wingsConfig, wingsHelper, webpack, express, } = globals;
	const { requireModule, } = wingsHelper;
	const env = wingsConfig.env();
	const isProduction = wingsConfig.isProduction(env);
	const staticPath = wingsConfig.staticPath(env);
	const server = express();

	if (!isProduction) {
		server.use(devMiddleware(compiler, devOptions));

		server.use(hotMiddleware(compiler, {
			log: false,
		}));
	}

	server.set('view engine', 'ejs');
	server.use(express.static(staticPath));

	const listen = (port, host, callback) => {
		server.listen(port, host, callback);
	};

	return {
		instance: server,
		listen,
	};
}

const defaultServerConfigure = () => {
	return new Promise((resolve, reject) => {
		resolve();
	});
};

export async function createNodeServer(nodeEntry, globals, compiler, devOptions) {
	const { wingsConfig, webpack, express, } = globals;
	const env = wingsConfig.env();
	const isProduction = wingsConfig.isProduction(env);
	const staticPath = wingsConfig.staticPath(env);
	const server = express();

	server.set('view engine', 'ejs');
	server.use(express.static(staticPath));

	if (nodeEntry) {
		const configureServer = nodeEntry.configure || defaultServerConfigure;
		await configureServer(server);
	} else {
		console.log('Node server didn\'t exist');
	}

	const listen = (port, host, callback) => {
		server.listen(port, host, callback);
	};

	return {
		instance: server,
		listen,
	};
}