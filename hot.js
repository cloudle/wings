const path = require('path'),
	chalk = require('chalk'),
	chokidar = require('chokidar'),
	invalidate = require('invalidate-module');

chokidar.watch('./src', { ignoreInitial: true }).on('all', (event, filename) => {
	// console.log(chalk.magenta('hot code reload'), chalk.green(filename), 'updated.');
	invalidate(path.resolve(filename));
	const consoleApp = require('./src/console');
	consoleApp.increase();
	consoleApp.update();
});

require('./src/console').update();
