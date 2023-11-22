import clsx from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';

import type { Product } from '@/types';

import s from '../cart/CartSidebarView/CartSidebarView.module.css';
import { Button } from '../ui';

type ProductItemProps = {
  product: Product;
  remove: (id: string) => void;
  handleClose?: () => void;
};

export const ProductItem: FC<ProductItemProps> = ({
  product: item,
  remove,
  handleClose,
}) => {
  return (
    <li key={item.id} className={clsx(s.lineItem, 'mb-3 border-b pb-2')}>
      <div className="flex flex-1">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-accent-2">
          <img
            // src={item.image}
            src={`data:image/jpeg;base64,${item.image}`}
            alt={item.name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="ml-5 flex flex-1 flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <h3 className="font-medium leading-6 text-base">
                <Link href={`/products/${item.id}`}>
                  <div onClick={handleClose}>{item.name}</div>
                </Link>
              </h3>
              <p className="ml-4 font-medium leading-6 text-base">
                {item.price}
              </p>
            </div>
            <p className="mt-1 text-sm leading-5 text-accent-3">
              {item.description}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2 flex h-8 w-full justify-end">
        <Button
          className="h-full w-5"
          variant="slim"
          onClick={() => remove(item.id)}
        >
          X
        </Button>
      </div>
    </li>
  );
};
