import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { socket } from '../providers/socket.io';
import Card from './ui/card';

function Logs() {
	const [logs, setLogs] = useState([]);

	useEffect(() => {
		socket.on('log', (log) => {
			if (typeof log === 'string') {
				setLogs((prev) => [...prev, log]);
			}
		});
	}, []);

	return (
		<Card title='Logs' subTitle={'Output from the command'}>
			{logs.map((log, index) => (
				<Text key={index}>{log}</Text>
			))}
		</Card>
	);
}

export default Logs;
