import {Link as RadixLink} from '@radix-ui/themes';
import NextLink from 'next/link';

interface Props {
  href: string;
  children: string;
}

export const IssueLink = ({href, children}: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};
