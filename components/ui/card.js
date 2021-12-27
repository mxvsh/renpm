import React from 'react';
import { Box, Divider, Heading, Stack, Text } from '@chakra-ui/react';

function Card({ children, title, subTitle }) {
	return (
		<Box px={4} py={3} bg='gray.50' rounded='md'>
			<Heading size='md'>{title}</Heading>
			<Text fontSize={'sm'} color='gray.500'>
				{subTitle}
			</Text>
			<Divider my={4} />
			<Stack px={2}>{children}</Stack>
		</Box>
	);
}

export default Card;
