'use client'
import { VStack, Button, List, Heading, ListItem, Card, CardHeader, CardBody, Box } from '@chakra-ui/react'
import { useAccount, useBalance, useBlockNumber, useChainId, useChains, useDisconnect, useEnsName, useEstimateFeesPerGas, useFeeData } from 'wagmi'
import { useState, useEffect } from 'react'
import { formatUnits } from 'viem'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/store/auth'
const Home = () => {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const [isClient, setIsClient] = useState(false)
  const [accessToken, setAccessToken] = useState(null)

  const {isAuth, setAuthStatus} = useAuthStore()

  const balance = useBalance({ address })
  const blockNumber = useBlockNumber()
  const chainId = useChainId()
  const chains = useChains()
  const { data: feeData, isLoading: feeLoading } = useEstimateFeesPerGas()

  useEffect(() => {
    setIsClient(true)
  }, [])

  function logout() {
    setAuthStatus('unauthenticated')
    Cookies.remove('token')
    disconnect()
  }
  if (!isClient) return <></>
  return (
    <VStack w={'full'} alignItems="start">
      <Heading size='xl' marginBottom={6}>
        Account Info
      </Heading>

      <List spacing={3}>
        <ListItem>
          Connected account: { address && <span>{address}</span> }
        </ListItem>
        <ListItem>
          Account authenticated : {isAuth ? '✅' : '❌'}
        </ListItem>
        <ListItem>
          balance: {balance.status === 'success'
          ? `${(Math.floor(Number(formatUnits(balance.data?.value, balance.data?.decimals)) * 100)) / 100} ${balance.data?.symbol}`
          : ''}
        </ListItem>
        <ListItem>
          blockNumber: {blockNumber.status === 'success' && String(blockNumber.data) }
        </ListItem>
        <ListItem>
          chainId: { chainId }
        </ListItem>
        <ListItem>
          chains:
          <List>
            {
              chains.map((item) => {
                return (<ListItem ml={6} key={item.id}>{item.name} —— {item.nativeCurrency.symbol} —— {item.id}</ListItem>)
              })
            }
          </List>
        </ListItem>
        <ListItem>
          <p>Fee data: </p>
          {
            feeLoading
              ? 'Loading...'
              : Object
                .entries(feeData?.formatted || {})
                .map(([key,value]) => <Box ml={6} key={key}>   {key}: {value || '--'}</Box>)
          }
        </ListItem>
        {
          isAuth && (
            <ListItem>
              <Button size="md" onClick={() => logout()}>Logout</Button>
            </ListItem>
          )
        }
        {/* <ListItem>
        <ListIcon as={SettingsIcon} color="green.500" />
        ... and more
        </ListItem> */}
      </List>


    </VStack>
  );
};

export default Home;
