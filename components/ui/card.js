import React from 'react';
import { Box, Divider, Heading, Stack } from '@chakra-ui/react';

function Card({ children, title }) {
	return (
		<Box px={4} py={3} bg='gray.100' rounded='md'>
			<Heading size='md'>{title}</Heading>
			<Divider my={4} />
			<Stack maxW='96'>{children}</Stack>
		</Box>
	);
}

export default Card;
