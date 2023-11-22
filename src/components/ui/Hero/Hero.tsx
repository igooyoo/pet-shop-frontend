import type { FC } from 'react';
import React from 'react';

import Text from '../Text/Text';

interface HeroProps {
  className?: string;
  description: string;
}

const Hero: FC<HeroProps> = ({ description }) => {
  return (
    <div className="my-12 flex items-center justify-around">
      <div className="w-96">
        <Text>
          <h2 className="uppercase">Pets Shop</h2>
        </Text>
        <Text className="my-8">
          <h6 className="text-xs font-light text-accent-5">{description}</h6>
        </Text>
      </div>
      <div>
        <div className="h-72 w-72 rounded-full bg-primary-2">
          <img src="/cat2.svg" alt="pattern" className="scale-105" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
