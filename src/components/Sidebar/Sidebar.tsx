'use client'

import { Box, Center, HStack, List, ListItem, ListProps, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { ReactElement, ReactNode, useRef } from 'react';
import Link from 'next/link'

type MainNavLinkProps = {
  href: string
  icon?: ReactElement
  children: ReactNode
  label?: string
  isActive?: boolean
  isExternal?: boolean
}

const MainNavLink = ({
  href,
  icon,
  children,
  isActive,
  isExternal,
}: MainNavLinkProps) => {
  // const router = useRouter()
  // const active = router.path.startsWith(href) || !!isActive
  const routerPath = usePathname()
  const active = !!isActive
  const { colorMode }  = useColorMode()
  return (
    <Link href={href} passHref legacyBehavior>
      <HStack
        as="a"
        target={isExternal ? '_blank' : undefined}
        spacing='3'
        fontSize='sm'
        pl="4"
        py="2"
        rounded='md'
        fontWeight={active ? '600' : 'medium'}
        color={active ? 'accent-emphasis' : 'fg-muted'}
        _hover={{ color: active ? undefined : 'fg' }}
        bg={active ? (colorMode === 'dark' ? 'rgba(48, 140, 122, 0.3)': 'teal.50') : ''}
      >
        {icon &&
          <Center
            w='6'
            h='6'
            borderWidth='1px'
            bg={active ? 'accent-static' : 'transparent'}
            borderColor={active ? 'accent-static' : undefined}
            rounded='base'
            color={active ? 'white' : 'accent'}
          >
            {icon}
          </Center>
        }
        <span>{children}</span>
      </HStack>
    </Link>
  )
}

interface MainNavLinksItem {
  href: string,
  label: string,
  external: boolean,
  icon?: ReactElement,
  match?: (a: string, b: string) => boolean
}

export const mainNavLinks: MainNavLinksItem[] = [
  {
    href: '/',
    label: 'Account Info',
    external: false,
    match(routePath, href) {
      return routePath === 'index' || routePath ==='' || routePath === '/'
    }
  },
  {
    href: '/nftBalance',
    label: 'NftBalance',
    external: false,
    match(routePath, href) {
      return  routePath.startsWith('/nftBalance')
    }
  },
  {
    href: '/transaction',
    label: 'Transaction',
    external: false,
    match(routePath, href) {
      return  routePath.startsWith('/transaction')
    }
  },
  {
    href: '/contract',
    label: 'Contract',
    external: false,
    match(routePath, href) {
      return  routePath.startsWith('/contract')
    }
  }
]
export const MainNavLinkGroup = (props: ListProps) => {
  const routerPath = usePathname()
  return (
    <List spacing='4' styleType='none' {...props}>
      {mainNavLinks.map((item) => (
        <ListItem key={item.label}>
          <MainNavLink
            icon={item.icon}
            href={item.href}
            label={item.label}
            isActive={item.match?.(routerPath, item.href)}
            isExternal={item?.external}
          >
            {item.label}
          </MainNavLink>
        </ListItem>
      ))}
    </List>
  )
}

const Sidebar = () => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <Box
      ref={ref}
      aria-label='Main Navigation'
      as='nav'
      overscrollBehavior='contain'
      top='6.5rem'
      w='280px'

      pr='8'
      pb='6'
      pl='6'
      pt='4'
      overflowY='auto'
      className='sidebar-content'
      flexShrink={0}
      display={{ base: 'none', md: 'block' }}
    >
      {/* pos='sticky'
      h='calc(100vh - 8.125rem)' */}
      <MainNavLinkGroup mb='10' />
      {/* <SidebarContent routes={routes} pathname={pathname} contentRef={ref} /> */}
    </Box>
  )
}

export default Sidebar;
