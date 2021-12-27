const colors = require('colors');
const { existsSync } = require('fs');
const config = require('../providers/config');

module.exports = {
	remove(_name) {
		const cwd = process.cwd();
		const packagePath = `${cwd}/package.json`;

		if (!existsSync(packagePath)) {
			console.log(
				colors.bold.red(`[error] "package.json" not found in ${cwd}`)
			);
			return;
		}

		const { packages = [] } = config.get();

		const exists = packages.find(({ name }) => name === _name);
		if (!exists) {
			console.log(colors.bold.red(`[error] "${_name}" doest not exist`));
			return;
		}

		try {
			packages.splice(packages.indexOf(exists), 1);
			config.set('packages', packages);
		} catch (e) {}
	},
};
