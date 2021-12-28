const { spawn } = require('child_process');
const config = require('../../providers/config');

module.exports = {
	startProcess(name, script) {
		const { packages, processes = [] } = config.get();
		const pkg = packages.find(({ name: pkgName }) => pkgName === name);

		const alreadyRunning = processes.find(
			({ name: pkgName }) => pkgName === name
		);

		// if the package is already running or not
		if (alreadyRunning) {
			if (alreadyRunning.script === script) {
				socket.emit('error', {
					message: 'already running',
				});
			}
			return;
		}

		// spawn the process
		const child = spawn('npm', ['run', script], {
			cwd: pkg.__cwd,
		});
		const processData = {
			name,
			script,
			pid: child.pid,
		};

		// update the config
		processes.push(processData);
		config.set('processes', processes);

		return child;
	},
};
