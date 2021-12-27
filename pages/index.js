import Head from 'next/head';
import {
	Box,
	chakra,
	Divider,
	Flex,
	Heading,
	HStack,
	Spacer,
	Stack,
	Tag,
	Text,
} from '@chakra-ui/react';

// components
import Sidebar from '../components/sidebar';
import Scripts from '../components/scripts';
import Dependencies from '../components/dependencies';
import { useState } from 'react';

const packageJson = require('../package.json');

export default function Home({ version, packages }) {
	const [active, setActive] = useState(null);

	return (
		<>
			<Head>
				<title>renpm - remote npm script</title>
			</Head>

			<Stack px={2} maxW='5xl' m='0 auto' mt={12}>
				<Box>
					<Heading color='gray.600'>
						<chakra.span color={'red.400'}>re</chakra.span>npm
					</Heading>
					<Text mb={4}>v{version}</Text>
				</Box>

				<Flex>
					<Box w='sm'>
						<Sidebar onChange={setActive} packages={packages} />
					</Box>
					<Box ml={20} w='full'>
						{active ? (
							<>
								<HStack>
									<Heading size='lg'>{active.name}</Heading>
									<Spacer />
									<Tag>v{active.version}</Tag>
								</HStack>
								<Text>{active.description}</Text>
								<Divider my={4} />
								<Stack>
									<Scripts scripts={active.scripts || {}} />
									<Dependencies
										deps={active.dependencies || {}}
										devDeps={active.devDependencies || {}}
									/>
								</Stack>
							</>
						) : (
							<>
								<Heading textAlign={'center'}>Select a package</Heading>
							</>
						)}
					</Box>
				</Flex>
			</Stack>
		</>
	);
}

export const getServerSideProps = async () => {
	const config = require('../providers/config');
	return {
		props: {
			version: packageJson.version,
			packages: config.get('packages'),
		},
	};
};
