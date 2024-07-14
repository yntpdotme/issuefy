import {auth} from '@/auth';
import {ThemeSwitch} from '@/components/ThemeSwitch';
import {Container, Flex} from '@radix-ui/themes';
import Link from 'next/link';
import {AiFillBug} from 'react-icons/ai';
import {AuthStatus} from './AuthStatus';
import {NavLinks} from './NavLinks';

const NavBar = async () => {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-[5] border-b px-5 py-3 backdrop-blur-md dark:border-zinc-800">
      <Container>
        <Flex justify="between" minHeight="32px">
          <Flex align="center" gap="5">
            <Link href="/" className="mr-0.5">
              <AiFillBug size="19" />
            </Link>
            <NavLinks />
          </Flex>
          <Flex align="center" gap="5">
            <ThemeSwitch />
            <AuthStatus session={session} />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
