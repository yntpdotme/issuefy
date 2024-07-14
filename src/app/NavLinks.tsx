'use client';

import classNames from 'classnames';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    {label: 'Dashboard', href: '/dashboard'},
    {label: 'Issues', href: '/issues'},
  ];

  return (
    <ul className="flex space-x-7">
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
