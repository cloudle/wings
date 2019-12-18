import yargs from 'yargs';
import injectCommand from './inject';

const cliInstance = yargs.usage('usage: $0 <command>');

[injectCommand].forEach(({ name, description, builder }) => {
	cliInstance.command(name, description, builder);
});

cliInstance.argv;
