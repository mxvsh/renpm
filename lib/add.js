const colors = require('colors');
const { existsSync, readFileSync } = require('fs');
const config = require('../providers/config');

module.exports = {
	add() {
		const cwd = process.cwd();
		const packagePath = `${cwd}/package.json`;

		if (!existsSync(packagePath)) {
			console.log(
				colors.bold.red(`[error] "package.json" not found in ${cwd}`)
			);
			return;
		}
		const packageJson = readFileSync(packagePath, 'utf-8');
		const { packages = [] } = config.get();

		const exists = packages.find(({ name }) => name === 'renpm');
		if (exists) {
			console.log(colors.bold.red(`[error] "${exists.name}" already exists`));
			return;
		}

		try {
			const parsed = JSON.parse(packageJson);
			packages.push(parsed);
			config.set('packages', packages);
			console.log(
				colors.bold.green(`[success] "${parsed.name}" added to dashboard`)
			);
		} catch (e) {
			console.log(e);
		}
	},
};
