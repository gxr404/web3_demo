'use client'

import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { bscTestnet, sepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'web3 demo',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  // projectId: 'Test',
  chains: [sepolia, bscTestnet],
  ssr: true
  // connectors: [
  //   injected()
  // ],
  // transports: {
  //   [mainnet.id]: http(),
  //   [sepolia.id]: http(),
  // },
})


