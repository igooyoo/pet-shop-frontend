import cn from 'clsx';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

import type { Product } from '@/types';

import ProductTag from '../ProductTag/ProductTag';
import s from './ProductCard.module.css';

interface Props {
  className?: string;
  product: Product;
  noNameTag?: boolean;
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>;
  variant?: 'default' | 'slim' | 'simple';
}

const placeholderImg = '/product-img-placeholder.svg';

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  );

  return (
    <Link
      href={`/product/${product.id}`}
      className={rootClassName}
      aria-label={product.name}
    >
      {variant === 'slim' && (
        <>
          <div className={s.header}>
            <span>{product.name}</span>
          </div>
          {product?.image && (
            <Image
              quality="85"
              src={product.image || placeholderImg}
              alt={product.name || 'Product Image'}
              height={320}
              width={320}
              {...imgProps}
            />
          )}
        </>
      )}

      {variant === 'simple' && (
        <>
          {!noNameTag && (
            <div className={s.header}>
              <h3 className={s.name}>
                <span>{product.name}</span>
              </h3>
              <div className={s.price}>{`${product.price}`}</div>
            </div>
          )}
          <div className={s.imageContainer}>
            {product?.image && (
              <Image
                alt={product.name || 'Product Image'}
                className={s.productImage}
                src={product.image || placeholderImg}
                height={540}
                width={540}
                quality="85"
                {...imgProps}
              />
            )}
          </div>
        </>
      )}

      {variant === 'default' && (
        <>
          <ProductTag name={product.name} price={`${product.price}`} />
          <div className={s.imageContainer}>
            {product?.image && (
              <Image
                alt={product.name || 'Product Image'}
                className={s.productImage}
                src={product.image || placeholderImg}
                height={540}
                width={540}
                quality="85"
                {...imgProps}
              />
            )}
          </div>
        </>
      )}
    </Link>
  );
};

export default ProductCard;
