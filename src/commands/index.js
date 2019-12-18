import yargs from 'yargs';
import defaultCommand from './default';
import injectCommand from './inject';

const cliInstance = yargs.usage('usage: $0 <command>')
	.alias('h', 'help')
	.alias('v', 'version');

[ defaultCommand,
	injectCommand,
].forEach((options) => {
	cliInstance.command(options);
});

cliInstance.help().argv;
