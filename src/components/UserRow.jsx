import { DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Flex,
  IconButton,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const UserRow = ({ user, onDelete, isLocal = false }) => {
  const bgColor = useColorModeValue(
    isLocal ? "blue.50" : "white",
    isLocal ? "blue.900" : "gray.800"
  );
  return (
    <Tr bg={bgColor} _hover={{ bg: isLocal ? "blue.100" : "gray.50" }}>
      <Td>
        <Flex align="center" gap={2}>
          <Text fontWeight="medium">
            {user.firstName} {user.lastName}
          </Text>
          {isLocal && (
            <Badge colorScheme="blue" size="sm" variant="solid">
              Local
            </Badge>
          )}
        </Flex>
      </Td>
      <Td>{user.company?.name || "N/A"}</Td>
      <Td>{user.company?.title || "N/A"}</Td>
      <Td>{user.address?.country || "N/A"}</Td>
      <Td>
        <IconButton
          aria-label="Delete user"
          icon={<DeleteIcon />}
          colorScheme="red"
          variant="ghost"
          size="sm"
          onClick={() => onDelete(user.id)}
          _hover={{ bg: "red.50" }}
        />
      </Td>
    </Tr>
  );
};

export default UserRow;
