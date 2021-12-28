import React from 'react';
import { Tag, HStack, Spacer, Stack, Text } from '@chakra-ui/react';
import Card from './ui/card';

function Dependencies({ deps, devDeps }) {
	const depsKeys = Object.keys(deps);
	const devDepsKeys = Object.keys(devDeps);

	return (
		<Stack>
			<Card
				title='Dependencies'
				subTitle={'Modules installed in the project'}
				defaultVisible={false}
			>
				{depsKeys.map((key, index) => (
					<HStack key={index}>
						<Text>{key}</Text>
						<Spacer />
						<Tag>{deps[key]}</Tag>
					</HStack>
				))}
			</Card>
			<Card
				title='Dev Dependencies'
				subTitle={'Modules required during development'}
				defaultVisible={false}
			>
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
