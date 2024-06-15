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
      className="text-primary w-full pb-5 font-normal text-inherit underline-offset-4 hover:bg-transparent hover:underline"
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
