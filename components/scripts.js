import React from 'react';
import { Box, Button, HStack, Spacer, Text } from '@chakra-ui/react';
import { FiPlay } from 'react-icons/fi';
import Card from './ui/card';

function Scripts() {
	return (
		<Card title='Scripts'>
			<HStack>
				<Box>
					<Text fontWeight={'semibold'}>dev</Text>
					<Text fontFamily={'monospace'}>next dev</Text>
				</Box>
				<Spacer />
				<Button leftIcon={<FiPlay />} size='xs' colorScheme={'red'}>
					run
				</Button>
			</HStack>
		</Card>
	);
}

export default Scripts;
