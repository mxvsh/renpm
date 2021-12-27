const { Command } = require('commander');
const packageJson = require('../package.json');

// libs
const { start } = require('../lib/start');
const { stop } = require('../lib/stop');

const program = new Command();
program.version(packageJson.version);

program
	.command('start')
	.description('start web dashboard')
	.action(() => {
		start();
	});

program
	.command('stop')
	.description('stop web dashboard')
	.action(() => {
		stop();
	});

program.parse(process.argv);
