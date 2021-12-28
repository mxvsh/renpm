const colors = require('colors');
const { existsSync, readFileSync } = require('fs');
const config = require('../providers/config');

module.exports = {
	update() {
		const cwd = process.cwd();
		const packagePath = `${cwd}/package.json`;

		if (!existsSync(packagePath)) {
			console.log(
				colors.bold.red(`[error] "package.json" not found in ${cwd}`)
			);
			return;
		}

		const { packages = [] } = config.get();

		const parsed = JSON.parse(readFileSync(packagePath, 'utf8'));

		const existsIdx = packages.findIndex(({ name }) => name === parsed.name);
		if (existsIdx === -1) {
			console.log(colors.bold.red(`[error] "${parsed.name}" doest not exist`));
			return;
		}

		try {
			packages[existsIdx] = parsed;
			config.set('packages', packages);
		} catch (e) {}
	},
};
