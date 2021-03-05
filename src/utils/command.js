import { execSync, } from 'child_process';

const getPackageName = (name, version) => `${name}@${version}`;

const getYarnVersion = () => {
	const versionCommand = process.platform.startsWith('win')
		? 'yarn --version 2> NUL'
		: 'yarn --version 2>/dev/null';

	try {
		return (execSync(versionCommand).toString() || '').trim();
	} catch (err) {
		console.log(`something went wrong when trying to get Yarn version.\nExecuted: ${versionCommand}`);
	}

	return null;
};

const getSaveFragment = (yarnVersion, isDevelopment) => {
	if (yarnVersion) {
		return isDevelopment ? ' -D ' : ' ';
	} else {
		return isDevelopment ? ' --save-dev ' : ' --save ';
	}
};

export const installPackages = (packageHash, isDevelopment, forceNpm) => {
	let installCommand;
	const yarnVersion = !forceNpm && getYarnVersion();

	if (packageHash) {
		const packageKeys = Object.keys(packageHash);
		if (!packageKeys.length) return;
		const addFragment = yarnVersion ? 'yarn add' : 'npm install';
		const saveFragment = getSaveFragment(yarnVersion, isDevelopment);
		const packageNames = packageKeys.map((name) => {
			const version = packageHash[name];
			return getPackageName(name, version);
		}).join(' ');
		installCommand = `${addFragment}${saveFragment}${packageNames}`;
	} else {
		installCommand = yarnVersion ? 'yarn install' : 'npm install';
	}

	try {
		execSync(installCommand, { stdio: 'inherit' });
	} catch (error) {
		console.log(error);
		console.error(`Failed to execute following command:\n${installCommand}`);
	}
};
