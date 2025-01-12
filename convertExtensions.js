import fs from 'node:fs/promises';
import path from 'node:path';

const convertExtensions = async dir => {
	console.log(dir, fromExt, toExt);
	const entries = await fs.readdir(dir, {
		withFileTypes: true,
		recursive: true
	});

	for (const entry of entries) {
		if (entry.isFile() && path.extname(entry.name) === fromExt) {
			const fullPath = path.join(entry.parentPath, entry.name);
			const newFile = path.join(
				entry.parentPath,
				`${path.basename(entry.name, fromExt)}${toExt}`
			);
			fs.rename(fullPath, newFile);
		}
	}
};

let [, , dir = '.', fromExt = 'jsx', toExt = 'tsx'] = process.argv;

const convertExtString = ext => (ext.startsWith('.') ? ext : `.${ext}`);
fromExt = convertExtString(fromExt);
toExt = convertExtString(toExt);

try {
	await fs.access(dir);
} catch (err) {
	console.error(`Error: Directory '${dir}' does not exist.`);
	process.exit(1);
}

convertExtensions(dir, fromExt, toExt);
