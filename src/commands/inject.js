export default {
	command: 'inject',
	desc: 'add [boilerplate|template] to existing project',
	// usage: 'usage: $0 create <item> [options]',
	builder: (yargs) => {
		const argv = yargs.command({
			command: 'project',
			desc: 'inject a project',
			handler: () => {
				console.log('inner command');
			},
		}).wrap(null).argv;

		if (argv._.length < 2) {
			yargs.showHelp();
		}
	},
};
