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

			<Stack h='100vh' overflow={'hidden'} px={2} maxW='5xl' m='0 auto'>
				<Flex>
					<Box pt={12}>
						<Box>
							<Heading color='gray.600'>
								re<chakra.span color={'red.400'}>npm</chakra.span>
							</Heading>
							<Text mb={4}>v{version}</Text>
						</Box>
						<Box w='sm'>
							<Sidebar onChange={setActive} packages={packages} />
						</Box>
					</Box>
					<Box h='100vh' w='full' overflow={'auto'}>
						{active ? (
							<Box pt={12} pb={6}>
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
							</Box>
						) : (
							<Box pt={12}>
								<Heading>Select a package</Heading>
							</Box>
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
