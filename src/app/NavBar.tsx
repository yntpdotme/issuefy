'use client';

import {LogoutButton} from '@/components/auth/LogoutButton';
import Skeleton from '@/components/Skeleton';
import {ThemeSwitch} from '@/components/ThemeSwitch';
import {useCurrentUser} from '@/hooks/useCurrentUser';
import {Container, Flex} from '@radix-ui/themes';
import classNames from 'classnames';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AiFillBug} from 'react-icons/ai';

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-10 border-b px-5 py-3 backdrop-blur-sm dark:border-zinc-800">
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
    <LogoutButton>
      <div className="nav-link text-[16.5px]">Logout</div>
    </LogoutButton>
  );
};

export default NavBar;
