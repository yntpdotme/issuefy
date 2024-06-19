import {Button} from '@radix-ui/themes';
import Link from 'next/link';

type BackButtonProps = {
  href: string;
  label: string;
  className?: string;
};

export const BackButton = ({
  href,
  label,
  className,
}: Readonly<BackButtonProps>) => {
  return (
    <Button
      variant="ghost"
      size="1"
      className={`text-primary w-full pb-5 font-normal text-inherit underline-offset-4 hover:bg-transparent hover:underline ${className}`}
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
