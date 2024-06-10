'use client'

import { useEffect } from 'react'
import {
  RainbowKitAuthenticationProvider,
  RainbowKitProvider as RawRainbowKitProvider,
  createAuthenticationAdapter,
  darkTheme,
  lightTheme
} from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect } from 'wagmi'
import Cookies from 'js-cookie'
import { useColorMode } from '@chakra-ui/react'

import { useSecretQuery } from '@/query/useSecretQuery'
import { type AuthStatus, useAuthStore } from '@/store/auth'
import type { DisconnectMutate } from 'wagmi/query'

type SetAuthStatus = (status: AuthStatus) => void
export function authenticationAdapter(
  address: `0x${string}` | undefined,
  setAuthStatus: SetAuthStatus,
  disconnect: DisconnectMutate) {
  return createAuthenticationAdapter({
    getNonce: async () => {
      const res = await fetch(`/api/v2/nonce`)
      const { code, data } = await res.json()
      return code === 0 ? data.nonce : ''
    },
    createMessage: ({ nonce, address, chainId }) => {
      return `Sign in with Web3 Demo \n\naddress: ${address}\nnonce: ${nonce} \nchainId: ${chainId}`
    },
    getMessageBody: ({ message }) => {
      return message
    },
    verify: async ({ message, signature }) => {
      const verifyRes = await fetch('/api/v2/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature, address }),
      })
      const { code, data } = await verifyRes.json()
      if (code === 0) {
        setAuthStatus("authenticated")
        return true
      }
      return false
    },
    signOut: async () => {
      Cookies.remove('token')
      setAuthStatus('unauthenticated')
      disconnect()
      // await fetch('/api/v2/logout');
    },
  })
}

export function RainbowKitProvider({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { colorMode } = useColorMode();
  const { address } = useAccount()
  const { status, setAuthStatus } = useAuthStore()
  const { data, isFetched } = useSecretQuery()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    if (!isFetched) return
    const token = Cookies.get('token')
    if (data?.code === 0) {
      setAuthStatus("authenticated")
    } else {
      // console.log('???000', data)
      setAuthStatus('unauthenticated')
      Cookies.remove('token')
      disconnect()
    }
  }, [data])

  const darkThemeObj =  darkTheme()
  darkThemeObj.colors.connectButtonBackground = '#2d3748'

  return (
    <RainbowKitAuthenticationProvider
      adapter={authenticationAdapter(address, setAuthStatus, disconnect)}
      status={status}
    >
      <RawRainbowKitProvider
        modalSize="compact"
        theme={colorMode === 'light' ? lightTheme() :darkThemeObj}>
        {children}
      </RawRainbowKitProvider>
    </RainbowKitAuthenticationProvider>
  )
}
