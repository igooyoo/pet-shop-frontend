import cn from 'clsx';
import Image from 'next/image';
import type { FC } from 'react';

import { Container } from '@/components/ui';
import type { Product } from '@/types';

import { Comments } from './Comments';
import ProductSidebar from './ProductSidebar';
import ProductTag from './ProductTag';
import s from './ProductView.module.css';

interface ProductViewProps {
  product?: Product;
}

const ProductView: FC<ProductViewProps> = ({ product }) => {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Container className="w-full p-8" clean>
        <div className={cn(s.root, 'fit')}>
          <ProductTag
            name={product.name}
            price={`${product.price}$`}
            fontSize={32}
          />
          <div className={cn(s.main, 'fit')}>
            <div className={s.sliderContainer}>
              <Image
                src={`data:image/jpeg;base64,${product.image}`}
                alt={product.name || 'Product Image'}
                fill
                className="rounded-sm"
              />
            </div>
          </div>

          <ProductSidebar
            key={product.id}
            product={product}
            className={s.sidebar}
          />
        </div>
        {product && <Comments productId={product?.id} />}
      </Container>
    </>
  );
};

export default ProductView;
