const ConfigStore = require('configstore');

const config = new ConfigStore('renpm', {
	pid: -1,
	packages: [],
});

module.exports = config;
