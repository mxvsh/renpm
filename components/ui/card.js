import React, { useState } from 'react';
import {
	Box,
	Divider,
	Heading,
	HStack,
	IconButton,
	Fade,
	Spacer,
	Stack,
	Text,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function Card({ children, title, subTitle }) {
	const [view, setView] = useState(true);

	return (
		<Box px={4} py={3} bg='gray.50' rounded='md'>
			<HStack>
				<Heading size='md'>{title}</Heading>
				<Spacer />
				<IconButton
					icon={view ? <FiEyeOff /> : <FiEye />}
					variant={'ghost'}
					onClick={() => {
						setView(!view);
					}}
				/>
			</HStack>
			<Text fontSize={'sm'} color='gray.500'>
				{subTitle}
			</Text>
			<Fade in={view} unmountOnExit>
				<Divider my={4} />
				<Stack px={2}>{children}</Stack>
			</Fade>
		</Box>
	);
}

export default Card;
