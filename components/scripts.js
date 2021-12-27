import React from 'react';
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

function Scripts({ scripts }) {
	const scriptKeys = Object.keys(scripts);
	return (
		<Card title='Scripts' subTitle='Execute scripts from the package'>
			<Stack userSelect={'none'}>
				{scriptKeys.map((key, index) => (
					<>
						<HStack
							key={index}
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
							>
								run
							</Button>
						</HStack>
						{index < scriptKeys.length - 1 && <Divider mt={2} />}
					</>
				))}
			</Stack>
		</Card>
	);
}

export default Scripts;
