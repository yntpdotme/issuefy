'use client';

import {LogoutButton} from '@/components/auth/LogoutButton';
import Skeleton from '@/components/Skeleton';
import {ThemeSwitch} from '@/components/ThemeSwitch';
import {useCurrentUser} from '@/hooks/useCurrentUser';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import classNames from 'classnames';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AiFillBug} from 'react-icons/ai';
import {RxExit} from 'react-icons/rx';

const NavBar = () => {
  return (
    <nav className="sticky top-0 border-b px-5 py-3 backdrop-blur-sm dark:border-zinc-800">
      <Container>
        <Flex justify="between" minHeight="32px">
          <Flex align="center" gap="5">
            <Link href="/" className="mr-0.5">
              <AiFillBug size="19" />
            </Link>
            <Navlinks />
          </Flex>
          <Flex align="center" gap="5">
            <ThemeSwitch />
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const Navlinks = () => {
  const currentPath = usePathname();

  const links = [
    {label: 'Dashboard', href: '/dashboard'},
    {label: 'Issues', href: '/issues'},
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className={classNames({
              'nav-link text-[16.5px]': true,
              '!text-zinc-900 dark:!text-zinc-50': link.href === currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const {status, user} = useCurrentUser();

  if (status === 'loading') return <Skeleton width="3rem" />;
  if (status === 'unauthenticated')
    return (
      <Link href="/auth/login" className="nav-link text-[16.5px]">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Text>
            <Avatar
              src={user!.image!}
              fallback={user?.name?.charAt(0) || 'U'}
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </Text>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          size="2"
          variant="soft"
          className="!relative mr-3 mt-3.5 2xl:mr-[225px]"
        >
          <DropdownMenu.Label>
            <Text size="2">{user!.email}</Text>
          </DropdownMenu.Label>
          <LogoutButton>
            <DropdownMenu.Item>
              <div className="flex gap-2 items-center">
                <RxExit /> Log out
              </div>
            </DropdownMenu.Item>
          </LogoutButton>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
