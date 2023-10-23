import {
    Box,
    Button,
    Checkbox,
    Heading,
    Input,
    Stack,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    
  } from "@chakra-ui/react";
  import { MoonIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import {
    adddata,
    clearcomleteddata,
    deleteitem,
    edititem,
    editstatus,
    } from "../redux/action";
  
  export const Todo = () => {
    const [task, settask] = useState("");
    const [edittask, setedittask] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [datalength, setdatalength] = useState(0);
    const data = useSelector((store) => store.reducer);
    const [showdata, setshowdata] = useState([]);
    const dispatch = useDispatch();
    function getdata() {
      setshowdata(data.todos);
    }
    useEffect(() => {
      getdata();
      setdatalength(data.todos.length);
    }, [data.todos]);
    console.log(showdata);
  
    function handleaddtodo() {
      let obj = {
        task,
        status: false,
      };
      dispatch(adddata(obj));
      setshowdata(data.todos);
      settask("");
    }
  
    function handlestatus(e) {
      dispatch(editstatus(e.target.name, data));
    }
  
    function handledelete(e) {
      dispatch(deleteitem(e, data));
    }

    function handleedit(task) {
      onOpen();
      data.todos.forEach((item) => {
        if (item.task == task) {
          setedittask(item.task);
        }
      });
    }
   function handleeditaction(item) {
      let obj = {
        task: edittask,
      };
      dispatch(edititem(item, obj, data));
      onClose();
    }
  
    return (
      <Box height={"600px"} width={"600px"} margin={"auto"}  backgroundColor={"#B5A3C8"} borderRadius={"10px"} marginTop={"30px"}>
        
        <Box h={"400px"} w={"600px"} backgroundColor={"#B5A3C8"}  borderRadius={"10px"}>
          <Box
            height={"100%"}
            width={"90%"}
            margin={"auto"}
            marginTop={"60px"}
            
          >
            <Box
              height={"13%"}
              width={"100%"}
              alignItems={"center"}
            >
              <Heading as={"h1"} color={"white"}>
                TODOS
              </Heading>

            </Box>
            <Box width={"100%"} marginBottom={"1%"} display={"flex"} marginTop={"60px"}>
              <Input
                placeholder="Add Task"
                backgroundColor={"white"}
                
                onChange={(e) => settask(e.target.value)}
                value={task}
                size="md"
                borderRadius={"7px 0px 0px 7px"}
              />
              <Button
                borderRadius={"0px 7px 7px 0px"}
                backgroundColor={"white"}
                
                onClick={handleaddtodo}
              >
                Add
              </Button>
            </Box>
  
            <Box
              height={"67%"}
              width={"100%"}
              backgroundColor={"white"}
              
            >
              {showdata.map((item) => (
                <Box
                  key={item.task}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Stack direction={"column"}>
                    <Checkbox
                      isChecked={item.status}
                      size="lg"
                      name={item.task}
                      onChange={(e) => handlestatus(e)}
                      
                      p={"10px 10px"}
                    >
                      {item.task}
                    </Checkbox>
                  </Stack>
  
                  <Box gap={"50px"} display={"flex"} p={"10px 10px"}>
                    <Box onClick={() => handleedit(item.task)}>
                      <EditIcon  />
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Modal Title</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <Input
                              mb={"15px"}
                              placeholder={"Task"}
                              value={edittask}
                              onChange={(e) => setedittask(e.target.value)}
                            />
                          </ModalBody>
  
                          <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                              Close
                            </Button>
                            <Button
                             
                              onClick={() => handleeditaction(item)}
                            >
                              EDIT
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Box>
                    <Box onClick={() => handledelete(item.task)}>
                      <CloseIcon />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box width={"100%"} backgroundColor={"white"} padding={"5px 10px"}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>
                  <Text> {datalength} lefts item</Text>
                </Box>
                <Box>
                  <Button
                    size="sm"
                    name="all"
                  >
                    All
                  </Button>
                  <Button
                    size="sm"
                  >
                    Active
                  </Button>
                  <Button
                    size="sm"
                    name="completed"
                  >
                    Completed
                  </Button>
                </Box>
                <Box>
                  <Button
                    size="sm"
                  >
                    Clear Completed
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };