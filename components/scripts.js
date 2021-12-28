import React, { useEffect, useMemo, useState } from 'react';
import {
	Box,
	Divider,
	Button,
	HStack,
	Stack,
	Spacer,
	Text,
	ButtonGroup,
} from '@chakra-ui/react';
import { FiBook, FiPlay } from 'react-icons/fi';
import Card from './ui/card';
import { socket } from '../providers/socket.io';

function Scripts({ name, scripts, processes = [] }) {
	const scriptProcesses = processes.filter(
		({ name: pkgName }) => pkgName === name
	);

	const scriptKeys = useMemo(() => Object.keys(scripts), [scripts]);
	const [running, setRunning] = useState({});

	useEffect(() => {
		scriptProcesses.map((p) => {
			setRunning({
				...running,
				[p.script]: true,
			});
		});

		socket.on('stopped', (data) => {
			if (data.name === name) {
				setRunning((prev) => ({
					...prev,
					[data.script]: false,
				}));
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const run = (script) => {
		setRunning({ ...running, [script]: true });
		socket.emit('run', {
			script,
			name,
		});
	};

	const stop = (script) => {
		socket.emit('stop', {
			script,
			name,
		});
		setRunning({ ...running, [script]: false });
	};

	return (
		<Card title='Scripts' subTitle='Execute scripts from the package'>
			<Stack userSelect={'none'}>
				{scriptKeys.map((script, index) => {
					const isRunning = running[script];

					return (
						<div key={index}>
							<HStack>
								<Box fontSize={'sm'}>
									<Text fontWeight={'semibold'}>{script}</Text>
									<Text>{scripts[script]}</Text>
								</Box>
								<Spacer />
								<ButtonGroup size='xs'>
									<Button
										variant={'ghost'}
										leftIcon={<FiBook />}
										onClick={() => {}}
									>
										view logs
									</Button>
									<Button
										variant={'ghost'}
										bg={isRunning ? 'red.50' : 'green.50'}
										borderWidth={'1px'}
										borderColor={'transparent'}
										_hover={{
											borderColor: isRunning ? 'red.300' : 'green.300',
										}}
										leftIcon={<FiPlay />}
										colorScheme={isRunning ? 'red' : 'green'}
										onClick={() => {
											isRunning ? stop(script) : run(script);
										}}
									>
										{isRunning ? 'stop' : 'run'}
									</Button>
								</ButtonGroup>
							</HStack>
							{index < scriptKeys.length - 1 && <Divider mt={2} />}
						</div>
					);
				})}
			</Stack>
		</Card>
	);
}

export default Scripts;
