const fs = require('fs');
const path = require('path');
const { resolve } = require('path');
const { readdir } = require('fs').promises;

async function getFiles(folder) {
	const fileOrFolders = await readdir(folder, { withFileTypes: true });
	const files = await Promise.all(fileOrFolders.map((fileOrFolder) => {
		const response = resolve(folder, fileOrFolder.name);
		return fileOrFolder.isDirectory() ? getFiles(response) : response;
	}));
	return Array.prototype.concat(...files);
}

function readFileSync(...components) {
	const keyUrl = path.resolve(...components);
	return fs.readFileSync(keyUrl, 'utf8');
}

function toBase64(value) {
	return Buffer.from(value).toString('base64');
}

function fromBase64(value) {
	return Buffer.from(value, 'base64').toString();
}

function decode(value) {
	return value ? JSON.parse(fromBase64(value)) : null;
}

function encode(value) {
	return toBase64(JSON.stringify(value));
}

function findItemInCollection(values, collection) {
	const keys = Object.keys(values);
	const index = collection.reduce((p, c, i) => {
		const match = keys.reduce((m, key) => {
			return m && c[key] === values[key];
		}, true);
		return match ? i : p;
	}, -1);
	if (index !== -1) {
		return collection[index];
	} else {
		return null;
	}
}

module.exports = {
	getFiles,
	readFileSync,
	findItemInCollection,
	encode,
	decode,
};
