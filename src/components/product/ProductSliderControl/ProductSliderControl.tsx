import cn from 'clsx';
import type { FC, MouseEventHandler } from 'react';
import { memo } from 'react';

import { ArrowLeft, ArrowRight } from '@/components/icons';

import s from './ProductSliderControl.module.css';

interface ProductSliderControlProps {
  onPrev: MouseEventHandler<HTMLButtonElement>;
  onNext: MouseEventHandler<HTMLButtonElement>;
}

const ProductSliderControl: FC<ProductSliderControlProps> = ({
  onPrev,
  onNext,
}) => (
  <div className={s.control}>
    <button
      className={cn(s.leftControl)}
      onClick={onPrev}
      aria-label="Previous Product Image"
    >
      <ArrowLeft />
    </button>
    <button
      className={cn(s.rightControl)}
      onClick={onNext}
      aria-label="Next Product Image"
    >
      <ArrowRight />
    </button>
  </div>
);

export default memo(ProductSliderControl);
