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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { failedNotify, successNotify } from "../utils";

function AddTodo({ onAdd }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);

  const [todo, setTodo] = useState({
    title: "",
    completed: false,
  });

  const handleChange = (e) => {
    const newTodo = { ...todo };
    newTodo[e.target.name] = e.target.value;
    setTodo(newTodo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/todos`,
        todo
      );
      successNotify("Todo has been added successfully");
      onAdd(response.data);
      onClose();
    } catch (error) {
      failedNotify(error.message);
    }
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        <AddIcon />
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Add Todo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Enter the todo title</FormLabel>
                <Input
                  ref={initialRef}
                  name="title"
                  onChange={handleChange}
                  placeholder="Title"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" type="submit" mr={3}>
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

export default AddTodo;
