'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { parseUnits } from 'viem'
import { VStack, Heading, useToast, Box, Select, Stack, Card,Text,Image, CardBody, Spinner, Divider, ButtonGroup, Button } from '@chakra-ui/react'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useOkxNftBalance } from '@/query/useOkxNftBalance'

const chainMap = {
  'Ethereum Mainnet': 'eth',
  'Polygon Mainnet': 'polygon',
  'Avalanche C-Chain': 'avax',
  'BNB Smart Chain Mainnet': 'bsc',
  'OKT Chain': 'oktc',
  'Arbitrum One': 'arbitrum',
  'Arbitrum Nova': 'arbitrum-nova',
  'OP Mainnet': 'optimism',
  'Klaytn Mainnet Cypress': 'klaytn',
  'zkSync Era Mainnet': 'zksync-era',
  'Base': 'base',
  'Linea': 'linea',
  'opBNB Mainnet': 'opbnb',
  'Polygon zkEVM': 'polygon-zkevm',
  'Scroll': 'scroll',
  'Manta Pacific Mainnet': 'manta-pacific'
}

const NftBalance = () => {
  const { address, isConnected } = useAccount()
  // const { disconnect } = useDisconnect()
  const [isClient, setIsClient] = useState(false)
  const toast = useToast()
  // const [accessToken, setAccessToken] = useState(null)

  // const {isAuth, setAuthStatus} = useAuthStore()
  // console.log('address', )
  const [chain, setChian] =  useState('eth')
  const { data, isFetched  } = useOkxNftBalance({
    chain,
    address
  })
  if (isFetched) {
    console.log(data)
  }
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isFetched && data?.code !== 0) {
      toast({
        title: 'Fetch Error',
        description: `Error Code ${data?.code}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }, [isFetched])

  if (!isClient) return <></>
  return (
    <VStack w={'full'} alignItems="start">
      <Heading size='xl' marginBottom={6}>
        Nft Balance
      </Heading>
      <Box mb={6}>
        <Select placeholder='Select option' value={chain} onChange={(event)=>{setChian(event.target.value)}}>
          {Object.keys(chainMap).map((key: string) => {
            return (<option key={key} value={(chainMap as any)[key]}>{key}</option>)
          })}
        </Select>
      </Box>
      {
        !isConnected
        ? <ConnectButton />
        : (<>
          {
            isFetched && Array.isArray(data?.data)
            ? (
              <Stack direction={['column', 'row']} wrap="wrap" spacing='24px'>
                {
                  data.data.map((item) => {
                    return (
                      <Box key={item.tokenId}>
                        <Card maxW={280}>
                          <CardBody>
                            <Image  objectFit='cover' boxSize='240px' src={item.image} alt={item.name} borderRadius='lg' />
                            <Stack mt='6' spacing='3'>
                              <Heading size='sm' noOfLines={1}>{item.name}</Heading>
                              <Text fontSize='sm'>
                                Price: {item.collection.stats.floorPrice || '--'}
                              </Text>
                            </Stack>
                          </CardBody>
                        </Card>
                      </Box>
                    )
                  })
                }
              </Stack>
              )
            : (<Stack align="center" w={"100%"} p={20}><Spinner size="xl"/></Stack>)
          }
        </>)
      }

    </VStack>
  );
};

export default NftBalance;
