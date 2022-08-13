import { Flex } from "@chakra-ui/react";
import React from "react";
import NavBar from "./components/NavBar";
import Todos from "./pages/Todos";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Flex flexDirection="column" height="100vh" overflow="auto">
      <NavBar />
      <Toaster />
      <Todos />
    </Flex>
  );
}

export default App;
