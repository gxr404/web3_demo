import type { Metadata } from 'next'
import CommonProvider from '@/components/CommonProvider'
import { Header } from '@/components/Header'

import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Box, Center, Divider, Flex } from '@chakra-ui/react'
import { Sidebar } from '@/components/Sidebar'


export const metadata: Metadata = {
  title: 'Web3 Demo',
  description: 'Web3 Demo...',
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CommonProvider>
          <Header />
          <Flex height="calc(100vh - 62px)" align="flex-start">
            <Box>
              <Sidebar />
            </Box>
            <Center height="100%">
              <Divider orientation='vertical' />
            </Center>
            {children}
          </Flex>
        </CommonProvider>
      </body>
    </html>
  );
}
