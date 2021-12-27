import React from 'react';
import { Box, Divider, Heading, Stack, Text } from '@chakra-ui/react';

const ProjectItem = ({ title, description }) => (
	<Box cursor={'pointer'}>
		<Heading size='md' fontWeight={'600'}>
			{title}
		</Heading>
		<Text fontSize={'sm'} noOfLines={2}>
			{description}
		</Text>
	</Box>
);

function Sidebar() {
	return (
		<Stack spacing={4} userSelect={'none'}>
			<ProjectItem
				title={'botmate'}
				description={
					'TypeScript-first schema validation with static type inference.'
				}
			/>
			<Divider />
			<ProjectItem
				title={'zod'}
				description={
					'TypeScript-first schema validation with static type inference.'
				}
			/>
		</Stack>
	);
}

export default Sidebar;
