import path from 'path';
import chokidar from 'chokidar';
import invalidate from 'invalidate-module';
import moduleAlias from 'module-alias';
import chalk from 'chalk';
import { extractGlobalModules, } from '../modules';

moduleAlias.addAlias('react-native', 'react-native-web');

const globalModules = extractGlobalModules();
const { wingsConfig, wingsHelper, webpack, express, } = globalModules;
const { requireModule, } = wingsHelper;
const env = wingsConfig.env();
const isProduction = wingsConfig.isProduction(env);
const nodeEntry = requireModule('index.node.js');
const configureServer = nodeEntry && nodeEntry.configureServer;

if (!isProduction && configureServer) { /* <- hot reload server-side code on development mode */
	const watcher = chokidar.watch(process.cwd(), {
		ignoreInitial: true,
		ignored: ['**/node_modules/**/*', '**/.git/**/*', '**/.idea/**/*'],
	});

	watcher.on('all', (event, filename) => {
		console.log(chalk.magenta('hot code reload'), chalk.green(filename), 'updated.');
		invalidate(path.resolve(filename));
	});
}

const asyncWrap = result => (result && result.then
	? result
	: new Promise(resolve => resolve(result)));

if (configureServer) {
	const staticPath = wingsConfig.staticPath(env);
	const host = wingsConfig.host();
	const port = wingsConfig.ssrPort();
	const server = express();

	server.set('view engine', 'ejs');
	server.use(express.static(staticPath));

	asyncWrap(configureServer(server, globalModules)).then(() => {
		server.use((req, res, next) => {
			const updatedEntry = require(path.resolve(process.cwd(), './index.node.js'));

			if (updatedEntry.configureRouter) {
				updatedEntry.configureRouter(server, globalModules)(req, res, next);
			} else next();
		});

		server.listen(port, host, () => {
			// console.log('server is ready!');
		});
	});
}
