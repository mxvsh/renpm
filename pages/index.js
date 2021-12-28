import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
	Box,
	chakra,
	Circle,
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
import { socket } from '../providers/socket.io';
import { FiAlertCircle } from 'react-icons/fi';
import Logs from '../components/log';
const packageJson = require('../package.json');

export default function Home({ version, packages }) {
	const [active, setActive] = useState(null);
	const [connectionStatus, setConnectionStatus] = useState(0);

	useEffect(() => {
		socket.on('connect', () => {
			setConnectionStatus(1);
		});
		socket.on('disconnect', () => {
			setConnectionStatus(-1);
		});
	}, []);

	return (
		<>
			<Head>
				<title>renpm - remote npm script</title>
			</Head>

			<Stack h='100vh' overflow={'hidden'} px={2} maxW='5xl' m='0 auto'>
				<HStack alignItems={'flex-start'} spacing={4}>
					<Box pt={12}>
						<Box mb={4}>
							<Heading color='gray.600'>
								re<chakra.span color={'red.400'}>npm</chakra.span>
							</Heading>
							<Text mb={4}>v{version}</Text>
						</Box>
						<Box w='xs'>
							<Sidebar onChange={setActive} packages={packages} />
							{connectionStatus === -1 && (
								<HStack mt={12} textColor={'red.400'}>
									<FiAlertCircle />
									<Text>connection lost</Text>
								</HStack>
							)}
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
									<Scripts name={active.name} scripts={active.scripts || {}} />
									<Dependencies
										deps={active.dependencies || {}}
										devDeps={active.devDependencies || {}}
									/>
									<Logs />
								</Stack>
							</Box>
						) : (
							<Box pt={12}>
								<Heading>Select a package</Heading>
							</Box>
						)}
					</Box>
				</HStack>
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
