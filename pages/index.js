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
	Text,
} from '@chakra-ui/react';

// components
import Sidebar from '../components/sidebar';
import Scripts from '../components/scripts';
import Packages from '../components/packages';

const packageJson = require('../package.json');

export default function Home({ version }) {
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
						<Sidebar />
					</Box>
					<Box ml={20} w='full'>
						<HStack>
							<Heading size='lg'>botmate</Heading>
							<Spacer />
							<Text>v1.3.4</Text>
						</HStack>
						<Divider my={4} />
						<Stack>
							<Scripts />
							<Packages />
						</Stack>
					</Box>
				</Flex>
			</Stack>
		</>
	);
}

export const getServerSideProps = async () => {
	return {
		props: {
			version: packageJson.version,
		},
	};
};
