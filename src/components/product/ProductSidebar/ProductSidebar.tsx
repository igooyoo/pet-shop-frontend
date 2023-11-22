/* eslint-disable no-promise-executor-return */
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { Button, Text, useUI } from '@/components/ui';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { createCart, getCategory } from '@/lib/api';
import type { Category, CreateCart, Product } from '@/types';

import s from './ProductSidebar.module.css';

interface ProductSidebarProps {
  product: Product;
  className?: string;
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const { openSidebar, setSidebarView } = useUI();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [category, setCategory] = useState<Category>();
  const { openModal, setModalView } = useUI();
  useEffect(() => {
    const fetchCategory = async () => {
      if (product?.category_id === undefined) return;
      const res = await getCategory(product?.category_id);
      const data = await res.data;
      setCategory(data);
    };
    fetchCategory();
  }, []);

  const addToCart = async () => {
    const token = JSON.parse(localStorage.getItem('token') || 'null');

    if (token === '' || token === null) {
      setModalView('LOGIN_VIEW');
      openModal();
      return;
    }

    setLoading(true);
    setError(null);

    const body: CreateCart = {
      product_id: product.id,
      user_id: token,
    };

    await createCart(body)
      .then(() => {
        setLoading(false);
        setSidebarView('CART_VIEW');
        openSidebar();
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return (
    <div className={className}>
      <Text className="w-full max-w-xl break-words pb-4" variant="pageHeading">
        Тайлбар
      </Text>
      <Text
        className="w-full max-w-xl break-words pb-4"
        html={product.description}
      />
      <div>
        {error && <ErrorMessage error={error} className="my-5" />}
        <Button
          aria-label="Сагсанд хийх"
          type="button"
          // variant="ghost"
          className={s.button}
          onClick={addToCart}
          loading={loading}
        >
          Сагсанд нэмэх
        </Button>
      </div>
      <div className="mt-6">
        <ul>
          <li>
            Төрөл: <strong>{category?.name}</strong>
          </li>
          <li>
            Хэмжээ: <strong>{product.quantity}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductSidebar;
