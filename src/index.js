import yargs from 'yargs';
import defaultCommand from './commands/default';
import extendsCommand from './commands/extends';
import injectCommand from './commands/inject';
import bundleCommand from './commands/bundle';

const cliInstance = yargs.usage('usage: $0 <command>')
	.alias('h', 'help')
	.alias('v', 'version');

[ defaultCommand,
	extendsCommand,
	injectCommand,
	bundleCommand,
].forEach((options) => {
	cliInstance.command(options);
});

cliInstance.help().argv;
