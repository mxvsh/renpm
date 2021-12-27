const colors = require('colors');
const { spawn } = require('child_process');
const pidusage = require('pidusage');
const config = require('../providers/config');

module.exports = {
	start() {
		const { port, pid } = config.get();

		pidusage(pid, (err) => {
			if (!err) {
				console.log(colors.bold.red(`[error] dashboard is already running`));
				return;
			}

			const _process = spawn('node', [__dirname + '/../server.js'], {
				stdio: ['ignore'],
				detached: true,
			});

			console.log('_process', _process.pid);
			config.set('pid', _process.pid);
			_process.unref();

			console.log(
				colors.bold.green(
					`[service] web dashboard in running on http://localhost:${port}`
				)
			);

			setTimeout(() => {
				process.exit(1);
			}, 1000);
		});
	},
};
