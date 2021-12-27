import React from 'react';
import { Tag, HStack, Spacer, Stack, Text } from '@chakra-ui/react';
import Card from './ui/card';

function Dependencies({ deps, devDeps }) {
	const depsKeys = Object.keys(deps);
	const devDepsKeys = Object.keys(devDeps);

	return (
		<Stack>
			<Card title='Dependencies'>
				{depsKeys.map((key, index) => (
					<HStack key={index}>
						<Text>{key}</Text>
						<Spacer />
						<Tag>{deps[key]}</Tag>
					</HStack>
				))}
			</Card>
			<Card title='Dev Dependencies'>
				{devDepsKeys.map((key, index) => (
					<HStack key={index}>
						<Text>{key}</Text>
						<Spacer />
						<Tag>{devDeps[key]}</Tag>
					</HStack>
				))}
			</Card>
		</Stack>
	);
}

export default Dependencies;
