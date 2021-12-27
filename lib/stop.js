const colors = require('colors');
const config = require('../providers/config');

module.exports = {
	stop() {
		const { pid } = config.get();
		if (pid !== -1) {
			config.set('pid', -1);
			try {
				process.kill(pid);
				console.log(colors.bold.yellow(`[service] web dashboard is stopped`));
				return;
			} catch (e) {}
		}
		console.log(colors.bold.red(`[error] dashboard is not running`));
	},
};
