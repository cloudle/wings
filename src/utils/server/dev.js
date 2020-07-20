import bodyParser from 'body-parser';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import { consoleStore, } from '../../console/store';
import * as consoleActions from '../../console/store/appAction';

if (process) {
	const inkLog = (...args) => consoleStore.dispatch(consoleActions.insertDevConsole(args));
	global.console.log = inkLog;
	global.console.warn = inkLog;
	global.console.error = inkLog;
}

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
	server.use('/consoleDispatcher', bodyParser.json(), (req, res, next) => {
		if (req.body.type) {
			consoleStore.dispatch(req.body);
		}
	});

	// server.use('/consoleLogger', bodyParser.json(), (req, res, next) => {
	// 	console.log(...req.body);
	// });

	const listen = (port, host, callback) => {
		server.listen(port, host, callback);
	};

	return {
		instance: server,
		listen,
	};
}
