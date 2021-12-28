const { Command } = require('commander');
const packageJson = require('../package.json');

// libs
const { start } = require('../lib/start');
const { stop } = require('../lib/stop');
const { add } = require('../lib/add');
const { remove } = require('../lib/remove');
const { update } = require('../lib/update');

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

program
	.command('add')
	.description('add a new npm project')
	.action(() => {
		add();
	});

program
	.command('remove')
	.arguments('<name>')
	.description('remove a new npm project')
	.action((name) => {
		remove(name);
	});

program
	.command('update')
	.description('update existing npm project')
	.action((name) => {
		update(name);
	});

program.parse(process.argv);
