'use client'
import { VStack, Heading, Input, Button, useToast, List, ListItem, Spinner } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { parseEther } from 'viem'
import { useEstimateGas, useSendTransaction, useTransaction, useWaitForTransactionReceipt } from 'wagmi'

const Transaction = () => {
  const [isClient, setIsClient] = useState(false)
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [tranHash, setTranHash] = useState('')
  const toast = useToast()
  const { sendTransactionAsync } = useSendTransaction()
  const { data, isError, isLoading } = useWaitForTransactionReceipt({
    hash:tranHash as `0x${string}`,
    query: {
      enabled: Boolean(tranHash)
    }
  })

  // const {data: transactionInfo} = useTransaction({
  //   hash:tranHash as `0x${string}`,
  //   query: {
  //     enabled: Boolean(tranHash)
  //   }
  // })

  useEffect(() => {
    setIsClient(true)
  }, [])

  // useEffect(() => {
  //   if (!isLoading) setTranHash('')
  // },[isLoading])
  const { data: GasData } = useEstimateGas({
    to: toAddress as `0x${string}`,
    value: parseEther('0.01'),
  })

  async function send() {
    if (!toAddress) {
      toast({
        title: 'toAddress not found',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
      return
    }
    const tranHash = await sendTransactionAsync({
      gas: GasData,
      to: toAddress as `0x${string}`,
      value: parseEther(amount),
    })
    if (tranHash) {
      setToAddress('')
      setAmount('')
      toast({
        title: 'success',
        description: `tranHash: ${tranHash}`,
        status: 'success',
        duration: 4000,
        // isClosable: true,
      })
      setTranHash(tranHash)
    }
  }

  // console.log(transactionInfo)
  if (!isClient) return <></>
  return (
    <VStack w={'full'} alignItems="start">
      <Heading size='xl' marginBottom={6}>
        Transaction
      </Heading>
      <List>
        <ListItem mb={6}>
          <span className='min-w-[120px] inline-block'>To: </span><Input placeholder='0x...' w={600} value={toAddress} onChange={e => setToAddress(e.target.value)} />
        </ListItem>
        <ListItem mb={6}>
          <span className='min-w-[120px] inline-block'> Amount: </span><Input placeholder='0.0001' w={600} value={amount} onChange={e => setAmount(e.target.value)} />
        </ListItem>
        {
          isLoading && (
            <ListItem mb={6}>
              <span className='min-w-[120px] inline-block mr-2'>In transaction:  </span> <Spinner />
            </ListItem>
          )
        }
        {/* {
          Object.entries(transactionInfo || {}).length && (
            <ListItem>
              <p>Transaction Info:</p>
              <List>
                {
                  Object.entries(transactionInfo || {}).map(([key, value]) =>{
                    return <ListItem key={key}>{key}: {value}</ListItem>
                  })
                }
              </List>
            </ListItem>
          )
        } */}
        <ListItem mb={6}>
          <Button disabled={!Boolean(GasData)} onClick={() => send()}>Send</Button>
        </ListItem>
      </List>
    </VStack>
  );
};

export default Transaction
