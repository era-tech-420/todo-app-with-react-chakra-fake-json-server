import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

import AddTodo from "../components/AddTodo";
import UpdateTodo from "../components/UpdateTodo";
import axios from "axios";
import { failedNotify, successNotify } from "../utils";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");

  let allTodos = todos;

  // search
  if (searchText) {
    allTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // filter
  if (filter) {
    allTodos = allTodos.filter(
      (todo) =>
        (filter === "completed" && todo.completed) ||
        (filter === "pending" && !todo.completed)
    );
  }

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const updateTodo = (todo) => {
    const allTodos = [...todos];
    const index = todos.findIndex((t) => t.id === todo.id);

    allTodos[index] = todo;
    setTodos(allTodos);
  };

  const deletedTodo = async (todo) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/todos/${todo.id}`,
        todo
      );
      let newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
      successNotify("Todo has been deleted successfully");
    } catch (error) {
      failedNotify(error.message);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/todos`
        );
        console.log(response.data);
        setTodos(response.data);
      } catch (error) {}
    };

    fetchTodos();
  }, []);

  return (
    <Box bg="gray.200" w="100%" height="100%" p={4} color="white">
      <HStack>
        <Input
          bg="white"
          color="black"
          placeholder="Search todos ...."
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          bg="white"
          color="black"
          w="10%"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </Select>
        <AddTodo onAdd={addTodo} />
      </HStack>
      <Grid templateColumns="repeat(4, 1fr)" gap="6" my="4">
        {allTodos.map((todo) => (
          <GridItem key={todo.id}>
            <Box
              bg="blue.100"
              color="black"
              p={3}
              boxShadow="outline"
              rounded="md"
            >
              <HStack justifyContent="space-between">
                <Text fontWeight="bold" w="100%" noOfLines="1">
                  Title: {todo.title}
                </Text>
                <Button
                  size="sm"
                  color="red.600"
                  _hover={{ bg: "red.600", color: "white" }}
                  _active={{ bg: "red.900", color: "white" }}
                  variant="ghost"
                  onClick={() => {
                    deletedTodo(todo);
                  }}
                >
                  <DeleteIcon />
                </Button>
                <UpdateTodo todo={todo} onUpdate={updateTodo} />
              </HStack>
              <Text fontWeight="bold" mt={2}>
                Status:{" "}
                <Badge
                  variant="subtle"
                  colorScheme={todo.completed ? "green" : "red"}
                >
                  {todo.completed ? "completed" : "pending"}
                </Badge>{" "}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default Todos;
