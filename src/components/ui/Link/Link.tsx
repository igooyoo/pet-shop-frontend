import type { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';

const Link: React.FC<
  NextLinkProps & {
    children?: React.ReactNode;
  }
> = ({ href, children, ...props }) => {
  return (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
