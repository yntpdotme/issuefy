import {BackButton} from '@/components/auth/BackButton';
import {GuestLogin} from '@/components/auth/GuestLogin';
import {Social} from '@/components/auth/Social';
import {Card, Flex} from '@radix-ui/themes';

type Props = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  showGuestLogin?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  showGuestLogin,
}: Readonly<Props>) => {
  return (
    <Card className="w-[400px] shadow-md">
      <div className="text-md p-6 text-center font-semibold text-black dark:text-white">
        {headerLabel}
      </div>
      <div>{children}</div>
      {showSocial && (
        <Flex direction="column" p="3" align="center" py="5">
          <Social />
        </Flex>
      )}
      <Flex direction="column" p="3" pt="0" align="center" gapY="5">
        {showGuestLogin && <GuestLogin />}
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </Flex>
    </Card>
  );
};
