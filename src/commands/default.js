export default {
	command: '$0 [port]',
	aliases: ['up', 'dev', 'run'],
	desc: 'start development',
	usage: '',
	builder: (yargs) => {

	},
	handler: () => {
		console.log('running default..');
	},
};
