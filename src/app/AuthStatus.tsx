import {LogoutButton} from '@/components/auth/LogoutButton';
import {Avatar, Box, Button, DropdownMenu, Text} from '@radix-ui/themes';
import {Session} from 'next-auth';
import Link from 'next/link';
import {RxExit} from 'react-icons/rx';

type Props = {
  session: Session | null;
};

export const AuthStatus = ({session}: Props) => {
  const user = session?.user;

  if (!user)
    return (
      <Button variant="surface">
        <Link href="/auth/login" className="nav-link text-[16.5px]">
          Login
        </Link>
      </Button>
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
              radius="medium"
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
              <div className="flex items-center gap-2">
                <RxExit /> Log out
              </div>
            </DropdownMenu.Item>
          </LogoutButton>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
