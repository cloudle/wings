import bodyParser from 'body-parser';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import { consoleStore, } from '../../console/store';
import * as consoleActions from '../../console/store/appAction';

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
		// console.log('hello');
		// if (req.body.type) {
		// 	console.log(req.body);
			// consoleStore.dispatch(req.body);
		// }
	});

	const listen = (port, host, callback) => {
		server.listen(port, host, callback);
	};

	return {
		instance: server,
		listen,
	};
}
