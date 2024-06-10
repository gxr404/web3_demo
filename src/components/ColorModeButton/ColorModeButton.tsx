'use client'

import { SunIcon, MoonIcon } from '@/components/ChakraUIClient';
import { Button, useColorMode } from '@chakra-ui/react';

const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button size="md"
    background={ colorMode === 'light' ? 'white' : '#2d3748'}
    _hover={{transform: 'scale(1.05)'}}
    boxShadow={colorMode === 'light'? '0px 4px 12px rgba(0, 0, 0, 0.1)': ''}
    transition={"0.125s ease"}
    onClick={toggleColorMode}>
      {colorMode === 'light' ? <SunIcon w={5} h={5} /> : <MoonIcon />}
    </Button>
  )
}

export default ColorModeButton
