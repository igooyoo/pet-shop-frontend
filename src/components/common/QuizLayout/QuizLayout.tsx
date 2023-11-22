import type { FC, ReactNode } from 'react';
import React from 'react';

import { Heading } from './Header';

type QuizLayoutProps = {
  children: ReactNode;
};

const QuizLayout: FC<QuizLayoutProps> = ({ children }) => {
  return (
    <div>
      <Heading />
      <main>{children}</main>
    </div>
  );
};

export default QuizLayout;
