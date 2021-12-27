import Head from 'next/head';
import {
	Box,
	chakra,
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

export default function Home() {
	return (
		<>
			<Head>
				<title>renpm - remote npm script</title>
			</Head>

			<Stack px={2} maxW='5xl' m='0 auto' mt={12}>
				<Heading mb={4} color='gray.600'>
					<chakra.span color={'red.400'}>re</chakra.span>npm
				</Heading>

				<Flex>
					<Box w='sm'>
						<Sidebar />
					</Box>
					<Stack ml={20} w='full'>
						<HStack mb={6}>
							<Heading size='lg'>botmate</Heading>
							<Spacer />
							<Text>v1.3.4</Text>
						</HStack>

						<Scripts />
						<Packages />
					</Stack>
				</Flex>
			</Stack>
		</>
	);
}
