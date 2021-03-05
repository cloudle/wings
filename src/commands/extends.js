import { extractGlobalModules, } from '../utils';
import { getTemplateGroups, getTemplatePath, suggestTemplates, installDependencies, copyBoilerplateFiles, } from '../utils/template';

export default {
	command: 'extends <group> [feature]',
	desc: 'add new features to existing project',
	choices: ['react', 'lambda'],
	builder: (yargs) => {
		yargs.positional('group', {
			choices: getTemplateGroups(),
		}).positional('feature', {
			describe: 'Name of the feature to extends',
			type: 'string',
		});
	},
	handler: async ({ group, feature }) => {
		const globalModules = extractGlobalModules();
		const templatePath = getTemplatePath(group, feature);

		if (templatePath) {
			copyBoilerplateFiles(templatePath);
			installDependencies(templatePath);
		} else {
			suggestTemplates(group, feature, globalModules);
		}
	},
};
