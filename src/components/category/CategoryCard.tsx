import clsx from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';

import { catImages } from '@/mock';
import type { Category } from '@/types';

type CategoryCardProps = {
  category: Category;
  big?: boolean;
  index: number;
};

export const CategoryCard: FC<CategoryCardProps> = ({
  category,
  big = false,
  index = 0,
}) => {
  if (!category) {
    return null;
  }

  return (
    <Link href={`/products/category/${category.id}`}>
      <div className="relative cursor-pointer overflow-hidden bg-white shadow-lg">
        <div className={clsx(big ? 'h-48' : 'h-32', 'relative')}>
          <img
            src={
              category.name
                ? `data:image/jpeg;base64,${category.image}`
                : catImages[index]
            }
            alt={category.name}
            className="absolute h-full w-full rounded-sm object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-end justify-end bg-black/20 p-3">
          <h5 className="mb-1 font-semibold text-accent-0">{category.name}</h5>
          <button className="flex items-center justify-center rounded-md bg-primary p-2">
            <p className="text-xs">Shop Now</p>
          </button>
        </div>
      </div>
    </Link>
  );
};
