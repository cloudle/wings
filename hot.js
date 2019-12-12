const path = require('path'),
	chalk = require('chalk'),
	chokidar = require('chokidar'),
	invalidate = require('invalidate-module');

chokidar.watch('./src', { ignoreInitial: true }).on('all', (event, filename) => {
	console.log(chalk.magenta('hot code reload'), chalk.green(filename), 'updated.');
	invalidate(path.resolve(filename));
	require('./src/index');
});

require('./src/index');
