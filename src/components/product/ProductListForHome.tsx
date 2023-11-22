import type { FC } from 'react';

import type { Product } from '@/types';

import { ProductCard } from './ProductCard';

type ProductListForHomeProps = {
  products: Product[];
};

export const ProductListForHome: FC<ProductListForHomeProps> = ({
  products,
}) => {
  return (
    <div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};
