import fs from 'fs';
import { join, extname, dirname } from 'path';

const binaryExtensions = ['.png', '.jar'];

export const isDirectory = source => fs.lstatSync(source).isDirectory();

export const walk = (current) => {
	if (!isDirectory(current)) return [current];
	const files = fs.readdirSync(current).map(child => walk(join(current, child)));

	return [].concat.apply([current], files);
};

export const copyBinaryFile = (srcPath, destPath, callback) => {
	let callbackCalled = false;
	const srcPermissions = fs.statSync(srcPath).mode;

	const done = (err) => {
		if (!callbackCalled) {
			callbackCalled = true;
			callback(err);
		}
	};

	const readStream = fs.createReadStream(srcPath);
	readStream.on('error', err => done(err));

	const writeStream = fs.createWriteStream(destPath, { mode: srcPermissions });
	writeStream.on('error', err => done(err));
	writeStream.on('close', () => done());

	readStream.pipe(writeStream);
};

export const copyAndReplace = (srcPath, destPath, replacements, contentChangedCallback) => {
	if (isDirectory(srcPath)) {
		if (!fs.existsSync(destPath)) {
			fs.mkdirSync(destPath);
		}

		return null;
	}

	const extension = extname(srcPath);

	if (binaryExtensions.indexOf(extension) >= 0) { /* <- handle Binary type */
		let shouldOverwrite = 'overwrite';

		if (contentChangedCallback) {
			const newContentBuffer = fs.readFileSync(srcPath);
			let contentChanged = 'identical';

			try {
				const originalContentBuffer = fs.readFileSync(destPath);
				if (Buffer.compare(originalContentBuffer, newContentBuffer) !== 0) {
					contentChanged = 'changed';
				}
			} catch (error) {
				if (error.code === 'ENOENT') {
					contentChanged = 'new';
				}
			}

			shouldOverwrite = contentChangedCallback(destPath, contentChanged);
		}

		if (shouldOverwrite === 'overwrite') {
			copyBinaryFile(srcPath, destPath, (err) => {
				if (err) throw err;
			});
		}
	} else { /* <- handle Text (other) file types */
		const srcPermissions = fs.statSync(srcPath).mode;
		let shouldOverwrite = 'overwrite';
		let content = fs.readFileSync(srcPath, 'utf8');

		Object.keys(replacements).forEach((regex) => {
			content = content.replace(new RegExp(regex, 'g'), replacements[regex]);
		});

		if (contentChangedCallback) {
			let contentChanged = 'identical';

			try {
				const originalContent = fs.readFileSync(destPath, 'utf8');
				if (content !== originalContent) {
					contentChanged = 'changed';
				}
			} catch (err) {
				if (err.code === 'ENOENT') {
					contentChanged = 'new';
				} else {
					throw err;
				}
			}

			shouldOverwrite = contentChangedCallback(destPath, contentChanged);
		}

		if (shouldOverwrite === 'overwrite') {
			fs.writeFileSync(destPath, content, { encoding: 'utf8', mode: srcPermissions });
		}
	}
};

export const writeFile = (file, data) => {
	const currentDir = dirname(file);

	if (!fs.existsSync(currentDir)) {
		fs.mkdirSync(currentDir, { recursive: true, });
	}

	fs.writeFileSync(file, data);
};
