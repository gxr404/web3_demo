'use client'

import { WagmiProvider } from 'wagmi'
import { config as wagmiConfig } from '@/utils/wagmi_config'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from './RainbowKitProvider'
import { useEffect, useState } from 'react'

const themeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const theme = extendTheme({
  config: themeConfig,
  semanticTokens: {
    colors: {
      // accent semantic tokens
      accent: { default: 'teal.500', _dark: 'teal.300' },
      'accent-emphasis': { default: 'teal.700', _dark: 'teal.200' },
      'accent-static': 'teal.500',
      'accent-muted': { default: 'teal.300', _dark: 'teal.200' },
      'accent-subtle': { default: 'teal.50', _dark: 'teal.800' },
      // foreground semantic tokens
      fg: { default: 'gray.700', _dark: 'gray.100' },
      'fg-emphasis': { default: 'gray.900', _dark: 'gray.200' },
      'fg-muted': { default: 'gray.600', _dark: 'gray.400' },
      'fg-subtle': { default: 'gray.500', _dark: 'gray.300' },
      'fg-on-accent': { default: 'white', _dark: 'inherit' },
    },
  }
})

// const antdTheme: ThemeConfig = {
//   components: {
//     Card:
//   }
// }
const queryClient = new QueryClient()

export default function CommonProvider({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ChakraProvider theme={theme}>
      {/* <ConfigProvider theme={antdTheme}> */}
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      {/* </ConfigProvider> */}
    </ChakraProvider>
  )
}
