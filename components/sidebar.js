import React from "react";
import { Box, Divider, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { FiCoffee, FiSettings } from "react-icons/fi";

const Options = [
  ["Donate", <FiCoffee key={2} />, "/settings"],
  ["Settings", <FiSettings key={1} />, "/donate"],
];

const SidebarMenu = () => {
  return (
    <Stack>
      {Options.map(([label, icon], idx) => (
        <HStack
          key={idx}
          p={2}
          rounded="2xl"
          cursor={"pointer"}
          _hover={{ color: "red.400", bg: "red.50" }}
          transition={"all 0.3s"}
        >
          {icon}
          <Text>{label}</Text>
        </HStack>
      ))}
    </Stack>
  );
};

const ProjectItem = ({ title, description }) => (
  <Box cursor={"pointer"}>
    <Heading size="md" fontWeight={"600"}>
      {title}
    </Heading>
    <Text fontSize={"sm"} noOfLines={2}>
      {description || "No description found"}
    </Text>
  </Box>
);

function Sidebar({ packages = [], onChange }) {
  return (
    <Stack spacing={4} userSelect={"none"}>
      <Box h="xs" overflow={"auto"}>
        <Stack spacing={4}>
          {packages.map((pkg, idx) => (
            <div key={idx} onClick={() => onChange(pkg)}>
              <ProjectItem title={pkg.name} description={pkg.description} />
            </div>
          ))}
        </Stack>
      </Box>
      <Divider />
      <SidebarMenu />
    </Stack>
  );
}

export default Sidebar;
