import {
  Card,
  CardBody,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from "react";

const UserStats = ({ apiCount, localCount, totalCount }) => {
  return (
    <Card>
      <CardBody>
        <StatGroup>
          <Stat textAlign="center">
            <StatLabel color="gray.600">API Users</StatLabel>
            <StatNumber color="blue.600">{apiCount}</StatNumber>
          </Stat>
          <Stat textAlign="center">
            <StatLabel color="gray.600">Local Users</StatLabel>
            <StatNumber color="green.600">{localCount}</StatNumber>
          </Stat>
          <Stat textAlign="center">
            <StatLabel color="gray.600">Total Users</StatLabel>
            <StatNumber>{totalCount}</StatNumber>
          </Stat>
        </StatGroup>
      </CardBody>
    </Card>
  );
};

export default UserStats;
