import React from 'react'
import Link from "next/link"
//Chakra-UI import
import { Stack, Container, HStack, Button } from '@chakra-ui/react';

const Navbar = () => {
    return (
      <Stack paddingTop="3" pl="4"  float="left" bg='gray.800'>
          <Container
              maxW="200"  
              borderWidth={1}
              borderRadius={20}
              paddingBlock={2}
          bgColor='gray.900'
          borderColor="purple.500"
          >
          <HStack spacing={2}> 
          <Link href="/HomePage">
          <Button bg="gray.700" maxW="20" color="white" _hover={{
                bg: 'gray.500',
                }}>Home</Button>
          </Link>
          <Link href="/">
          <Button bg="gray.700"  maxW="20" color="white" _hover={{
                bg: 'gray.500',
                }}>Swap</Button>
          </Link>
          
          </HStack>
      </Container>       
      </Stack>
        
    )
}

export default Navbar
