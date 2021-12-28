const express = require('express');
const next = require('next');
const dev = process.argv[2] === 'dev' || process.env.NODE_ENV === 'development';
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

// libs
const { stopProcess } = require('./lib/process/stop');
const { startProcess } = require('./lib/process/start');

function main(PORT) {
	app
		.prepare()
		.then(() => {
			const server = express();

			const http = require('http').createServer(server);
			const io = require('socket.io')(http);

			io.on('connection', (socket) => {
				socket.on('stop', (data) => {
					const { name, script } = data;
					stopProcess(name, script);
				});

				socket.on('run', (data) => {
					const { name, script } = data;
					const child = startProcess(name, script);

					child.stdout.setEncoding('utf8');
					child.stdout.on('data', (data) => {
						socket.emit('log', data);
					});
					child.stderr.on('data', (data) => {
						socket.emit('log', data);
					});
					child.on('close', (code) => {
						socket.emit('log', `process exited with code ${code}`);
						stopProcess(name, script);
						socket.emit('stopped', {
							name,
							script,
						});
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
