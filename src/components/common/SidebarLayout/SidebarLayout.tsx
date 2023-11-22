import cn from 'clsx';
import type { FC, ReactNode } from 'react';
import React from 'react';

import { ChevronLeft, Cross } from '@/components/icons';

import s from './SidebarLayout.module.css';

type ComponentProps = { className?: string; children?: ReactNode } & (
  | { handleClose: () => any; handleBack?: never }
  | { handleBack: () => any; handleClose?: never }
);

const SidebarLayout: FC<ComponentProps> = ({
  children,
  className,
  handleBack,
  handleClose,
}) => {
  return (
    <div className={cn(s.root, className)}>
      <header className={s.header}>
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="mr-6 flex items-center transition duration-150 ease-in-out hover:text-accent-5 focus:outline-none"
          >
            <Cross className="h-6 w-6 hover:text-accent-3" />
            <span className="ml-2 text-sm text-accent-7 ">Close</span>
          </button>
        )}
        {handleBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="flex items-center transition duration-150 ease-in-out hover:text-accent-5 focus:outline-none"
          >
            <ChevronLeft className="h-6 w-6 hover:text-accent-3" />
            <span className="ml-2 text-xs text-accent-7">Back</span>
          </button>
        )}
      </header>
      <div className={s.container}>{children}</div>
    </div>
  );
};

export default SidebarLayout;
