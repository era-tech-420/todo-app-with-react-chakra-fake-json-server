import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  FormLabel,
  FormControl,
  Icon,
  Checkbox,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { failedNotify, successNotify } from "../utils";

function UpdateTodo({ todo: todoToUpdate, onUpdate }) {
  const [todo, setTodo] = useState(todoToUpdate);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);

  const handleChange = (e) => {
    const updateTodo = { ...todo };

    if (e.target.type === "checkbox")
      updateTodo[e.target.name] = e.target.checked;
    else updateTodo[e.target.name] = e.target.value;

    setTodo(updateTodo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/todos/${todo.id}`,
        todo
      );
      successNotify("Todo has been updated successfully");
      onUpdate(response.data);
      onClose();
    } catch (error) {
      failedNotify(error.message);
    }
  };

  return (
    <>
      <Button
        size="sm"
        color="green.600"
        _hover={{ bg: "green.600", color: "white" }}
        _active={{ bg: "green.900", color: "white" }}
        variant="ghost"
        onClick={onOpen}
      >
        <Icon as={FaRegEdit} />
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Update Todo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Enter the todo title</FormLabel>
                <Input
                  ref={initialRef}
                  value={todo.title}
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Todo Status</FormLabel>
                <Checkbox
                  name="completed"
                  isChecked={todo.completed}
                  onChange={handleChange}
                >
                  Completed
                </Checkbox>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default UpdateTodo;
