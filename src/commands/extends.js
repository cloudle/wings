import { getTemplatePath, suggestTemplates, installDependencies, } from '../utils/template';

export default {
	command: 'extends <group> [feature]',
	desc: 'add new features to existing project',
	choices: ['react', 'lambda'],
	builder: (yargs) => {
		yargs.positional('group', {
			choices: ['react', 'node', 'lambda', 'electron'],
		}).positional('feature', {
			describe: 'Name of the feature to extends',
			type: 'string',
		});
	},
	handler: async ({ group, feature }) => {
		const templatePath = getTemplatePath(group, feature);

		if (templatePath) {
			installDependencies(templatePath);
		} else {
			suggestTemplates(group, feature);
		}
	},
};
