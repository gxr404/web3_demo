import { Box, Container, Flex, HStack } from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ColorModeButton'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header = () => {
  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color">
      <Container maxW="container.xl" p={'10px'}>
        <Flex align="center" justify="space-between">
          {/* <NavBar /> */}
          <span className="font-bold text-xl">Web3Demo</span>
          <HStack gap={'10px'}>
            <ConnectButton />
            <ColorModeButton />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
