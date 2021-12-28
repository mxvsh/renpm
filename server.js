const { spawn } = require('child_process');
const express = require('express');
const next = require('next');
const config = require('./providers/config');
const dev = process.argv[2] === 'dev' || process.env.NODE_ENV === 'development';
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

function main(PORT) {
	app
		.prepare()
		.then(() => {
			const server = express();

			const http = require('http').createServer(server);
			const io = require('socket.io')(http);

			io.on('connection', (socket) => {
				socket.on('run', (data) => {
					const { script, name } = data;
					const packages = config.get('packages');
					const pkg = packages.find(({ name: pkgName }) => pkgName === name);
					const child = spawn('npm', ['run', script], {
						cwd: pkg.__cwd,
					});
					child.stdout.setEncoding('utf8');
					child.stdout.on('data', (data) => {
						socket.emit('log', data);
					});
					child.stderr.on('data', (data) => {
						socket.emit('log', data);
					});
					child.on('close', (code) => {
						socket.emit('log', `child process exited with code ${code}`);
					});
				});
			});

			server.get('*', (req, res) => {
				return handle(req, res);
			});

			http.listen(PORT, (err) => {
				if (err) throw err;
				console.log('> Ready on http://localhost:' + PORT);
			});
		})
		.catch((ex) => {
			console.error(ex.stack);
			process.exit(1);
		});
}

main(2240);
