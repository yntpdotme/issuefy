import {Button} from '@radix-ui/themes';
import Link from 'next/link';

type BackButtonProps = {
  href: string;
  label: string;
};

export const BackButton = ({href, label}: Readonly<BackButtonProps>) => {
  return (
    <Button
      variant="ghost"
      size="1"
      className="text-primary w-full font-normal text-inherit underline-offset-4 hover:bg-transparent hover:underline pb-5"
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
