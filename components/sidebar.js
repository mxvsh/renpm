import React from 'react';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';

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

function Sidebar({ packages = [], onChange }) {
	return (
		<Stack spacing={4} userSelect={'none'}>
			{packages.map((pkg, idx) => (
				<div key={idx} onClick={() => onChange(pkg)}>
					<ProjectItem title={pkg.name} description={pkg.description} />
				</div>
			))}
		</Stack>
	);
}

export default Sidebar;
