import React from "react";
import { Flex, Spacer, Text } from "@chakra-ui/react";

function NavBar() {
  return (
    <Flex bg="gray.600" py="4" px="2">
      <Text fontSize="md" color="white" fontWeight="bold">
        Chakra Todo App
      </Text>
    </Flex>
  );
}

export default NavBar;
