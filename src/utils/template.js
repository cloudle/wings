import { existsSync, } from 'fs';
import { resolve, } from 'path';
import { installPackages, } from './command';

export const getTemplatePath = (group, feature) => {
	const templatePath = resolve(__dirname, `../../templates/${group}/${feature}`);
	return existsSync(templatePath) && templatePath;
};

export const suggestTemplates = (group, feature) => {
	const groupPath = resolve(__dirname, `../../templates/${group}`);
	const groupExist = existsSync(groupPath);

	if (groupExist) {
		if (feature) {
			console.log(feature, `feature (${group}) does not exist`);
		} else {
			console.log('Missing [feature] option, try..');
		}

		console.log(`wings extends ${group} [core|ssr]`);
	}
};

export const installDependencies = (templatePath) => {
	const packageJsonPath = resolve(templatePath, 'package.json');
	const packageJsonExist = existsSync(packageJsonPath);

	if (packageJsonExist) {
		const packageConfigure = require(packageJsonPath) || {};
		const { dependencies, devDependencies, } = packageConfigure;

		installPackages(dependencies);
		installPackages(devDependencies, true);
	}
};
