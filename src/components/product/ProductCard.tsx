import Link from 'next/link';
import type { FC } from 'react';

import type { Product } from '@/types';

import { Button } from '../ui';

type ProductCardProps = {
  product: Product;
  handleDelete?: () => void;
  index: number;
};

export const ProductCard: FC<ProductCardProps> = ({
  product,
  handleDelete,
}) => {
  return handleDelete ? (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="relative h-64 pb-2">
        <img
          src={`data:image/jpeg;base64,${product.image}`}
          alt={product.name}
          className="absolute h-full w-full bg-primary object-cover transition-all duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold">{product.price}</p>
          <p className="ml-2 text-sm font-medium text-accent-5">
            {(product.price + 25)?.toFixed(2)}
          </p>
        </div>
        <p className="mt-2 text-xs text-accent-4">{product.description}</p>
      </div>
      {handleDelete && (
        <div className="px-3">
          <Button
            onClick={handleDelete}
            variant="ghost"
            className="mb-2 h-8 w-full"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  ) : (
    <Link href={`/products/${product.id}`}>
      <div className="cursor-pointer overflow-hidden rounded-md bg-white shadow-md">
        <div className="relative h-64 pb-2">
          <img
            // src={images[index]}
            src={`data:image/jpeg;base64,${product.image}`}
            alt={product.name}
            className="absolute h-full w-full bg-primary object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold">₮{product.price}</p>
          </div>
          <p className="mt-2 text-xs text-accent-4">{product.description}</p>
        </div>
        {handleDelete && (
          <div className="px-3">
            <Button
              onClick={handleDelete}
              variant="ghost"
              className="mb-2 h-8 w-full"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
};
