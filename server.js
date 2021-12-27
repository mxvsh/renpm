const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV === 'development';
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

function main(PORT) {
	app
		.prepare()
		.then(() => {
			const server = express();

			server.get('*', (req, res) => {
				return handle(req, res);
			});

			server.listen(PORT, (err) => {
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
