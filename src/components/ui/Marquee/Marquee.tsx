import cn from 'clsx';
import type { Component, FC, ReactNode } from 'react';
import { Children } from 'react';
import FastMarquee from 'react-fast-marquee';

import s from './Marquee.module.css';

interface MarqueeProps {
  className?: string;
  children?: ReactNode[] | Component[] | any[];
  variant?: 'primary' | 'secondary';
}

const Marquee: FC<MarqueeProps> = ({
  className = '',
  children,
  variant = 'primary',
}) => {
  const rootClassName = cn(
    s.root,
    {
      [s.primary]: variant === 'primary',
      [s.secondary]: variant === 'secondary',
    },
    className
  );

  return (
    <FastMarquee gradient={false} className={rootClassName}>
      {Children.map(children, (child) => ({
        ...child,
        props: {
          ...child.props,
          className: cn(child.props.className, `${variant}`),
        },
      }))}
    </FastMarquee>
  );
};

export default Marquee;
