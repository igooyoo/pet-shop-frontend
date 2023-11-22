/* eslint-disable no-alert */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-nested-ternary */
import cn, { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type FC, useCallback, useEffect, useState } from 'react';

import SidebarLayout from '@/components/common/SidebarLayout';
import { Bag, Check, Cross } from '@/components/icons';
import { ProductItem } from '@/components/product/ProductItem';
import { Button, Text } from '@/components/ui';
import { useUI } from '@/components/ui/context';
import { deleteCart, getCarts, getProduct } from '@/lib/api';
import type { Cart, Product } from '@/types';

import s from './CartSidebarView.module.css';

const CartSidebarView: FC = () => {
  const { closeSidebar } = useUI();
  const { push } = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [card, setCard] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(false);

  const getCards = useCallback(async () => {
    const userId = JSON.parse(localStorage.getItem('token') || 'null');

    const res = await getCarts();
    const data: Cart[] = res.data?.items;
    setCard(data);
    const cards = data.filter((item) => item.user_id === userId);

    const productIds = cards.map((item) => item.product_id);

    const promises = productIds.map((id) =>
      getProduct(id).then((response) => response.data)
    );
    const temp = await Promise.all(promises);

    setProducts(temp);
  }, [getCarts, getProduct, setProducts]);

  useEffect(() => {
    getCards();
  }, []);

  const handleClose = () => closeSidebar();

  const subtotal = products.reduce((a, b) => a + (b.price || 0), 0);

  const error = null;
  const success = null;

  const isLoading = false;
  const isEmpty = products.length === 0;

  const remove = async (id: string) => {
    setLoading(true);
    const tempCard = card.find((item) => item.product_id === id);
    if (tempCard) {
      await deleteCart(tempCard.id)
        .then(async () => {
          alert('Амжилттай устгалаа');
          await getCards();
        })
        .catch(() => {
          alert('Алдаа гарлаа');
        });
    }
    setLoading(false);
  };

  const goToCheckout = async () => {
    try {
      setLoading(true);
      // fake checkout handler
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
      handleClose();
      push('/checkout');
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <SidebarLayout
      className={cn({
        [s.empty]: error || success || isLoading || isEmpty,
      })}
      handleClose={handleClose}
    >
      {isLoading || isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-primary bg-secondary p-12 text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-center text-2xl font-bold tracking-wide">
            Your cart is empty
          </h2>
          <p className="px-10 pt-2 text-center text-accent-3">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-center text-xl font-light">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white">
            <Check />
          </span>
          <h2 className="pt-6 text-center text-xl font-light">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <>
          <div className="flex-1 px-4 sm:px-6">
            <Link href="/cart">
              <Text variant="sectionHeading" onClick={handleClose}>
                Миний сагс
              </Text>
            </Link>
            <ul className={clsx(s.lineItemsList)}>
              {products.map((item) => (
                <ProductItem
                  key={item.id}
                  product={item}
                  handleClose={handleClose}
                  remove={remove}
                />
              ))}
            </ul>
          </div>

          <div className="sticky inset-x-0 bottom-0 z-20 w-full shrink-0 border-t bg-accent-0 p-6 text-sm sm:px-6">
            {/* <ul className="pb-2">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subtotal?.toFixed(2)}</span>
              </li>
            </ul> */}
            <div className="mb-5 flex justify-between py-3 font-bold">
              <span>Нийт</span>
              <span>{subtotal?.toFixed(2)}</span>
            </div>
            <div>
              <Button width="100%" onClick={goToCheckout} loading={loading}>
                Худалдан авах
              </Button>
            </div>
          </div>
        </>
      )}
    </SidebarLayout>
  );
};

export default CartSidebarView;
