import { walk, } from '../utils/fileProcessing';

export default {
	command: 'inject',
	desc: 'add [boilerplate|template] to existing project',
	// usage: 'usage: $0 create <item> [options]',
	handler: (args) => {
		console.log(walk(__dirname));
	},
};
