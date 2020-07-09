import { existsSync, readdirSync, lstatSync, } from 'fs';
import { resolve, join, } from 'path';
import { installPackages, } from './command';

const isDirectory = source => lstatSync(source).isDirectory();

export const getTemplateGroups = () => {
	const templatePath = resolve(__dirname, '../../templates');
	return readdirSync(templatePath).filter(name => isDirectory(join(templatePath, name)));
};

export const getTemplatePath = (group, feature) => {
	const templatePath = resolve(__dirname, `../../templates/${group}/${feature}`);
	return existsSync(templatePath) && templatePath;
};

export const suggestTemplates = (group, feature, { chalk, }) => {
	const groupPath = resolve(__dirname, `../../templates/${group}`);
	const availableFeatures = readdirSync(groupPath)
		.filter(name => isDirectory(join(groupPath, name)));
	const coloredHead = chalk.gray(`wings extends ${group}`);
	const coloredFeature = chalk.red(`${feature || 'feature'}`);
	const coloredFeatures = chalk.blue(`${availableFeatures.join('|')}`);
	const coloredSyntax = `${coloredHead} [${coloredFeature}] should be: [${coloredFeatures}]`;

	console.log(coloredSyntax);
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
