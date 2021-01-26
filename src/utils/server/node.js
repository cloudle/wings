import path from 'path';
import chokidar from 'chokidar';
import invalidate from 'invalidate-module';

import { requireModule, guessEntry, nodeEntries, } from '../helper';
import { extractGlobalModules, } from '../modules';

const express = requireModule('node_modules/express');
const entry = guessEntry(nodeEntries);
const nodeEntry = requireModule(entry);
const configureServer = nodeEntry?.configureServer;

const asyncWrap = result => (result && result.then
	? result
	: new Promise(resolve => resolve(result)));

if (configureServer) {
	const server = express();

	asyncWrap(configureServer(server)).then(() => {
		const globalModules = extractGlobalModules();
		const { wingsConfig, chalk, } = globalModules;
		const env = wingsConfig.env();
		const isProduction = wingsConfig.isProduction(env);
		const host = wingsConfig.host();
		const port = wingsConfig.ssrPort();
		const staticPath = wingsConfig.staticPath(env);

		if (!isProduction) { /* <- hot reload server-side code on development mode */
			const watcher = chokidar.watch(process.cwd(), {
				ignoreInitial: true,
				ignored: ['**/node_modules/**/*', '**/.git/**/*', '**/.idea/**/*'],
			});

			watcher.on('all', (event, filename) => {
				const relativeFilename = path.relative(process.cwd(), filename);

				invalidate(path.resolve(filename));
				console.log(`${chalk.gray('｢wings｣')} ${chalk.green('hot reloaded')} ${chalk.gray(relativeFilename)}`);
			});
		}

		server.set('view engine', 'ejs');
		server.use(express.static(staticPath));

		server.use((req, res, next) => {
			const updatedEntry = require(path.resolve(process.cwd(), entry));

			if (updatedEntry.configureRouter) {
				updatedEntry.configureRouter(server, globalModules)(req, res, next);
			} else next();
		});

		server.listen(port, host, () => {
			// console.log('server is ready!');
		});
	});
}
