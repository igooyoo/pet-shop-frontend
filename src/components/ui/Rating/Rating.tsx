import cn from 'clsx';
import type { FC } from 'react';
import { memo } from 'react';

import { Star } from '@/components/icons';
import rangeMap from '@/lib/range-map';

export interface RatingProps {
  value: number;
}

const Quantity: FC<RatingProps> = ({ value = 5 }) => (
  <div className="flex flex-row py-6 text-accent-9">
    {rangeMap(5, (i) => (
      <span
        key={`star_${i}`}
        className={cn('inline-block ml-1 ', {
          'text-accent-5': i >= Math.floor(value),
        })}
      >
        <Star />
      </span>
    ))}
  </div>
);

export default memo(Quantity);
