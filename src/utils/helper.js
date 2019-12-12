import { resolve, } from 'path';
import { existsSync, } from 'fs';
import { isArray, } from 'lodash';

export const requireModule = (directions, req = true) => {
	if (!isArray(directions)) {
		directions = [directions];
	}

	for (let i = 0; i < directions.length; i += 1) {
		const currentDirection = directions[i],
			searchPaths = [
				resolve(process.cwd(), currentDirection),
				resolve(__dirname, '../../', currentDirection),
			];

		for (let z = 0; z < searchPaths.length; z += 1) {
			if (existsSync(searchPaths[z])) {
				return req ? require(searchPaths[z]) : searchPaths[z];
			}
		}
	}
};

const conventionalEntries = ['index.js', 'index.web.js', 'index.node.js', 'index.ios.js', 'index.android.js'];

export const guessEntry = () => {
	const searchPaths = conventionalEntries.map(i => resolve(process.cwd(), i));

	for (let i = 0; i < searchPaths.length; i += 1) {
		if (existsSync(searchPaths[i])) {
			return conventionalEntries[i];
		}
	}

	return undefined;
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
