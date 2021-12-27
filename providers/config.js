const ConfigStore = require('configstore');

const config = new ConfigStore('renpm', {
	pid: -1,
	port: 2240,
	packages: [],
});

module.exports = config;
