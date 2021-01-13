import { resolve, } from 'path';
import { existsSync, } from 'fs';
import { isArray, isEmpty, } from 'lodash';

function ensureArray(value) {
	if (isArray(value)) {
		return value;
	}

	return [value];
}

export function optionsToQueryString(options) {
	if (isEmpty(options)) {
		return '';
	}

	return Object.keys(options).reduce((acc, next) => `${acc}${next}=${options[next]}&`, '?').slice(0, -1);
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

const conventionalEntries = ['index.web.js', 'index.js'];

export const guessEntry = (searchList = conventionalEntries) => {
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
