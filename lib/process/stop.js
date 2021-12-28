const config = require('../../providers/config');

module.exports = {
	stopProcess(name, script) {
		const { processes = [] } = config.get();

		const alreadyRunningIdx = processes.findIndex(
			({ name: pkgName, script: s }) => pkgName === name && s === script
		);

		if (alreadyRunningIdx > -1) {
			const p = processes[alreadyRunningIdx];
			try {
				process.kill(p.pid);
			} catch (e) {}
			processes.splice(alreadyRunningIdx, 1);
			config.set({ processes });
		}

		return true;
	},
};
