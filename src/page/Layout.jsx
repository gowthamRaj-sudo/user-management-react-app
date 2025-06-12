import  { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Spinner,
  Center,
  useDisclosure,
  Flex,
  Heading,
  Card,
  CardBody,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import UserStats from "../components/UserStats";
import SearchBox from "../components/SearchBox";
import UserRow from "../components/UserRow";
import AddUserModal from "../components/AddUserModal";

const Layout = () => {
  const [users, setUsers] = useState([]);
  const [localUsers, setLocalUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const theadBg = useColorModeValue("gray.100", "gray.700");
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setUsers(data.users || []);
      toast({
        title: "Success",
        description: "Users refreshed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = (newUser) => {
    setLocalUsers((prev) => [...prev, newUser]);
    toast({
      title: "User Added",
      description: `${newUser.firstName} ${newUser.lastName} has been added successfully`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleDeleteUser = (userId) => {
    const isLocalUser = localUsers.some((user) => user.id === userId);
    let deletedUser;

    if (isLocalUser) {
      deletedUser = localUsers.find((user) => user.id === userId);
      setLocalUsers((prev) => prev.filter((user) => user.id !== userId));
    } else {
      deletedUser = users.find((user) => user.id === userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }

    toast({
      title: "User Deleted",
      description: `${deletedUser?.firstName} ${deletedUser?.lastName} has been removed`,
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const filterUsers = (userList) => {
    if (!searchTerm) return userList;

    return userList.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const companyName = user.company?.name?.toLowerCase() || "";
      const role = user.company?.title?.toLowerCase() || "";
      const country = user.address?.country?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      return (
        fullName.includes(search) ||
        companyName.includes(search) ||
        role.includes(search) ||
        country.includes(search)
      );
    });
  };

  const filteredUsers = filterUsers(users);
  const filteredLocalUsers = filterUsers(localUsers);
  const allFilteredUsers = [...filteredLocalUsers, ...filteredUsers];

  return (
    <ChakraProvider>
      <Box minH="100vh" bg={bgColor}>
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            <Box textAlign="center">
              <Heading size="2xl" color="gray.800" mb={4}>
                User Management System
              </Heading>
            </Box>
            <UserStats
              apiCount={filteredUsers.length}
              localCount={filteredLocalUsers.length}
              totalCount={allFilteredUsers.length}
            />
            <Card bg={cardBg}>
              <CardBody>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  justify="space-between"
                  align={{ base: "stretch", md: "center" }}
                  gap={4}
                >
                  <SearchBox
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search by name, company, role, or country..."
                  />

                  <HStack spacing={3}>
                    <Button
                      leftIcon={<RepeatIcon />}
                      colorScheme="blue"
                      variant="outline"
                      onClick={fetchUsers}
                      isLoading={loading}
                      loadingText="Refreshing..."
                      size="md"
                    >
                      Refresh
                    </Button>
                    <Button
                      leftIcon={<AddIcon />}
                      colorScheme="green"
                      onClick={onOpen}
                      size="md"
                    >
                      Add User
                    </Button>
                  </HStack>
                </Flex>
              </CardBody>
            </Card>
            {searchTerm && (
              <Box>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Showing {allFilteredUsers.length} result
                  {allFilteredUsers.length !== 1 ? "s" : ""}
                  for "{searchTerm}"
                </Text>
              </Box>
            )}
            <Card bg={cardBg} shadow="lg">
              <CardBody p={0}>
                {loading ? (
                  <Center py={12}>
                    <VStack spacing={4}>
                      <Spinner size="xl" color="blue.500" thickness="4px" />
                      <Text color="gray.600">Loading users...</Text>
                    </VStack>
                  </Center>
                ) : (
                  <TableContainer>
                    <Table variant="simple" size="md">
                      <Thead bg={theadBg}>
                        <Tr>
                          <Th fontWeight="bold">Name</Th>
                          <Th fontWeight="bold">Company</Th>
                          <Th fontWeight="bold">Role</Th>
                          <Th fontWeight="bold">Country</Th>
                          <Th fontWeight="bold" textAlign="center">
                            Actions
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {allFilteredUsers.length === 0 ? (
                          <Tr>
                            <Td colSpan={5} textAlign="center" py={12}>
                              <VStack spacing={3}>
                                <Text fontSize="lg" color="gray.500">
                                  {searchTerm
                                    ? "No users found matching your search"
                                    : "No users available"}
                                </Text>
                                {searchTerm && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setSearchTerm("")}
                                  >
                                    Clear search
                                  </Button>
                                )}
                              </VStack>
                            </Td>
                          </Tr>
                        ) : (
                          allFilteredUsers.map((user) => (
                            <UserRow
                              key={`${user.id}-${
                                localUsers.includes(user) ? "local" : "api"
                              }`}
                              user={user}
                              onDelete={handleDeleteUser}
                              isLocal={localUsers.includes(user)}
                            />
                          ))
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                )}
              </CardBody>
            </Card>
            <Card bg={cardBg}>
              <CardBody>
                <VStack spacing={3}>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.600">
                    Legend
                  </Text>
                  <HStack spacing={8} justify="center" fontSize="sm">
                    <HStack>
                      <Box
                        w={4}
                        h={4}
                        bg="white"
                        border="2px"
                        borderColor="gray.200"
                        borderRadius="sm"
                      />
                      <Text color="gray.600">API Users</Text>
                    </HStack>
                    <HStack>
                      <Box
                        w={4}
                        h={4}
                        bg="blue.50"
                        border="2px"
                        borderColor="blue.200"
                        borderRadius="sm"
                      />
                      <Text color="gray.600">Local Users</Text>
                    </HStack>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Container>
        <AddUserModal
          isOpen={isOpen}
          onClose={onClose}
          onAddUser={handleAddUser}
        />
      </Box>
    </ChakraProvider>
  );
};

export default Layout;
