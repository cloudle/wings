import { resolve, } from 'path';
import { existsSync, } from 'fs';
import { isArray, isEmpty, } from 'lodash';
import axios from 'axios';
import { gt, } from 'semver';
import localMetrics from '../../package.json';

function ensureArray(value) {
	if (isArray(value)) {
		return value;
	}

	return [value];
}

export const requireModule = (directions, req = require) => {
	directions = ensureArray(directions);

	for (let i = 0; i < directions.length; i += 1) {
		const currentDirection = directions[i],
			searchPaths = [
				resolve(process.cwd(), currentDirection),
				resolve(__dirname, '../../', currentDirection),
			];

		for (let z = 0; z < searchPaths.length; z += 1) {
			if (existsSync(searchPaths[z])) {
				return req(searchPaths[z]);
			}
		}
	}
};

export const resolveModule = directions => requireModule(directions, require.resolve);

export const webEntries = ['index.web.js', 'index.js', 'index.ts', 'index.web.ts'];
export const nodeEntries = ['index.node.js', 'server.js', 'node.js', 'index.node.ts', 'server.ts', 'node.ts'];

export const guessEntry = (searchList = webEntries) => {
	for (let i = 0; i < searchList.length; i += 1) {
		const searchPath = resolve(process.cwd(), searchList[i]);

		if (existsSync(searchPath)) {
			return searchList[i];
		}
	}

	return undefined;
};

export const moduleExist = (aliases, localModule = false) => {
	aliases = ensureArray(aliases);

	for (let i = 0; i < aliases.length; i += 1) {
		const searchPath = localModule
			? resolve(process.cwd(), aliases[i])
			: resolve(process.cwd(), 'node_modules', aliases[i]);

		if (!existsSync(searchPath)) {
			return false;
		}
	}

	return true;
};

export const getEjsTemplate = () => {
	const searchPaths = [
		resolve(process.cwd(), 'index.ejs'),
		resolve(__dirname, '../../', 'index.ejs'),
	];

	for (let i = 0; i < searchPaths.length; i += 1) {
		if (existsSync(searchPaths[i])) {
			return searchPaths[i];
		}
	}

	return undefined;
};

const chalk = requireModule('node_modules/chalk');

export const checkForUpdates = async () => {
	try {
		const { data: remoteMetrics, } = await axios.get('https://registry.npmjs.org/wings-cli');
		const latest = remoteMetrics?.['dist-tags']?.latest;
		const formattedLatest = chalk.magenta(`wings-cli@${latest}`);
		const installCommand = chalk.yellow(`npm i -g wings-cli@${latest}`);

		if (gt(latest, localMetrics.version)) {
			console.log(chalk.gray(`｢wings｣ • ${formattedLatest} is available..`));
			console.log(chalk.gray(`        • ${installCommand} to install (recommended)`));
		}
	} catch (e) {}
};
