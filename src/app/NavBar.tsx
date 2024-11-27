'use client';

import ThemeSwitch from '@/components/ThemeSwitch';
import {Container, Flex} from '@radix-ui/themes';
import classNames from 'classnames';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AiFillBug} from 'react-icons/ai';

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-10 border-b px-5 py-3 backdrop-blur-sm dark:border-zinc-800">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="5">
            <Link href="/" className="mr-0.5">
              <AiFillBug size="18" />
            </Link>
            <Navlinks />
          </Flex>
          <Flex align="center" gap="5">
            <ThemeSwitch />
            <span className="nav-link">Login</span>
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
              'nav-link': true,
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

export default NavBar;
