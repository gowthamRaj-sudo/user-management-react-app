import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

const SearchBox = ({ value, onChange, placeholder }) => {
  return (
    <InputGroup maxW="400px" size="md">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.400" />
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        focusBorderColor="blue.500"
        borderColor="gray.300"
        _hover={{ borderColor: "gray.400" }}
      />
    </InputGroup>
  );
};

export default SearchBox;
