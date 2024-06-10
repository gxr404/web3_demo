'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { parseUnits } from 'viem'
import { VStack, Heading, useToast, Box, Select, Stack, Card,Text,Image, CardBody, Spinner, Divider, ButtonGroup, Button } from '@chakra-ui/react'

const Contract = () => {
  return (
    <VStack w={'full'} alignItems="start">
      <Heading size='xl' marginBottom={6}>
        Contract
      </Heading>
    </VStack>
  );
};

export default Contract;
