import path from 'path';
import chokidar from 'chokidar';
import invalidate from 'invalidate-module';
import moduleAlias from 'module-alias';
import chalk from 'chalk';
import { extractGlobalModules, } from '../modules';

const globalModules = extractGlobalModules();
const { wingsConfig, wingsHelper, webpack, express, } = globalModules;
const { requireModule, } = wingsHelper;
const env = wingsConfig.env();
const isProduction = wingsConfig.isProduction(env);
const staticPath = wingsConfig.staticPath(env);
const host = wingsConfig.host();
const port = wingsConfig.ssrPort();
const server = express();
const nodeEntry = requireModule('index.node.js');
const defaultServerConfigure = () => new Promise((resolve, reject) => resolve());
const serverConfigure = nodeEntry.configureServer || defaultServerConfigure;

moduleAlias.addAlias('react-native', 'react-native-web');

if (!isProduction) { /* <- hot reload server-side code on development mode */
	const watcher = chokidar.watch([
		path.resolve(process.cwd(), './src'),
		path.resolve(process.cwd(), './index.js'),
		path.resolve(process.cwd(), './index.node.js'),
	], { ignoreInitial: true });

	watcher.on('all', (event, filename) => {
		console.log(chalk.magenta('hot code reload'), chalk.green(filename), 'updated.');
		invalidate(path.resolve(filename));
	});
}

server.set('view engine', 'ejs');
server.use(express.static(staticPath));

server.use((req, res, next) => {
	require(path.resolve(process.cwd(), './index.node.js'))
		.configureRouter(server, express)(req, res, next);
});

serverConfigure(server).then(() => {
	server.listen(port, host, () => {
		console.log('server is ready!');
	});
});