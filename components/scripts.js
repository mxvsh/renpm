import React, { useEffect, useMemo, useState } from 'react';
import {
	Box,
	Divider,
	Button,
	HStack,
	Stack,
	Spacer,
	Text,
} from '@chakra-ui/react';
import { FiPlay } from 'react-icons/fi';
import Card from './ui/card';
import { socket } from '../providers/socket.io';

function Scripts({ name, scripts }) {
	const scriptKeys = useMemo(() => Object.keys(scripts), [scripts]);
	const [running, setRunning] = useState({});

	useEffect(() => {
		socket.on('log', (msg) => {
			console.log(msg);
		});
	}, []);

	const run = (script) => {
		setRunning({ ...running, [name]: true });
		socket.emit('run', {
			script,
			name,
		});
		setTimeout(() => {
			setRunning({ ...running, [name]: false });
		}, 2000);
	};

	return (
		<Card title='Scripts' subTitle='Execute scripts from the package'>
			<Stack userSelect={'none'}>
				{scriptKeys.map((key, index) => (
					<div key={index}>
						<HStack
							willChange={''}
							transition={'all 0.2s'}
							_hover={{
								transform: 'translateX(2px)',
							}}
						>
							<Box fontSize={'sm'}>
								<Text fontWeight={'semibold'}>{key}</Text>
								<Text>{scripts[key]}</Text>
							</Box>
							<Spacer />
							<Button
								variant={'ghost'}
								leftIcon={<FiPlay />}
								size='xs'
								colorScheme={'red'}
								isLoading={running[key]}
								onClick={() => {
									run(key);
								}}
							>
								run
							</Button>
						</HStack>
						{index < scriptKeys.length - 1 && <Divider mt={2} />}
					</div>
				))}
			</Stack>
		</Card>
	);
}

export default Scripts;
