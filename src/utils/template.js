import fs from 'fs';
import { resolve, join, relative, } from 'path';
import { isDirectory, walk, copyBinaryFile, copyAndReplace } from './fileProcessing';
import { installPackages, } from './command';

export const getTemplateGroups = () => {
	const templatePath = resolve(__dirname, '../../templates');
	return fs.readdirSync(templatePath).filter(name => isDirectory(join(templatePath, name)));
};

export const getTemplatePath = (group, feature) => {
	const templatePath = resolve(__dirname, `../../templates/${group}/${feature}`);
	return fs.existsSync(templatePath) && templatePath;
};

export const suggestTemplates = (group, feature, { chalk, }) => {
	const groupPath = resolve(__dirname, `../../templates/${group}`);
	const availableFeatures = fs.readdirSync(groupPath)
		.filter(name => isDirectory(join(groupPath, name)));
	const coloredHead = chalk.gray(`wings extends ${group}`);
	const coloredFeature = chalk.red(`${feature || 'feature'}`);
	const coloredFeatures = chalk.blue(`${availableFeatures.join('|')}`);
	const suggestionAction = feature ? '- is invalid, available options:' : '- is missing, available options:';
	const coloredSyntax = `${coloredHead} [${coloredFeature}] ${suggestionAction} [${coloredFeatures}]`;

	console.log(coloredSyntax);
};

export const installDependencies = (templatePath) => {
	const packageJsonPath = resolve(templatePath, 'package.json');
	const packageJsonExist = fs.existsSync(packageJsonPath);

	if (packageJsonExist) {
		installPackages();
	}
};

const templateExclusions = [];

export const copyBoilerplateFiles = (templatePath) => {
	walk(templatePath).forEach((absoluteSrcPath) => {
		const relativePath = relative(templatePath, absoluteSrcPath);
		const relativeRenamedPath = dotFilePath(relativePath);
		const absoluteDestinationPath = resolve(process.cwd(), relativeRenamedPath);

		if (templateExclusions.indexOf(relativeRenamedPath) === -1) {
			copyAndReplace(absoluteSrcPath, absoluteDestinationPath, {});
		}
	});
};

const dotFilePath = (filePath) => {
	if (!filePath) filePath;

	return filePath
		.replace('_eslintrc', '.eslintrc')
		.replace('_gitignore', '.gitignore')
		.replace('_gitattributes', '.gitattributes')
		.replace('_babelrc', '.babelrc')
		.replace('_flowconfig', '.flowconfig')
		.replace('_buckconfig', '.buckconfig')
		.replace('_watchmanconfig', '.watchmanconfig');
};
