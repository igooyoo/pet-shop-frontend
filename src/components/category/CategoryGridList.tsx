import type { FC } from 'react';

import type { Category } from '@/types';

import { CategoryCard } from './CategoryCard';

type CategoryGridListProps = {
  categories: Category[];
};

export const CategoryGridList: FC<CategoryGridListProps> = ({ categories }) => {
  return (
    <div className="mx-auto flex max-w-4xl">
      <div className="w-2/3">
        <div className="mb-3.5">
          <CategoryCard category={categories[0]} big index={0} />
        </div>
        <div className="mb-3">
          <CategoryCard category={categories[1]} big index={1} />
        </div>
      </div>
      <div className="ml-2 flex w-1/3 flex-col">
        <div className="mb-2">
          <CategoryCard category={categories[2]} index={2} />
        </div>
        <div className="mb-1.5">
          <CategoryCard category={categories[3]} index={3} />
        </div>
        <div className="mb-2">
          <CategoryCard category={categories[4]} index={4} />
        </div>
      </div>
    </div>
  );
};
