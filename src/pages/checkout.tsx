/* eslint-disable no-alert */
/* eslint-disable no-promise-executor-return */
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { Layout } from '@/components/common/Layout';
import { ProductItem } from '@/components/product/ProductItem';
import { Button, Container, LoadingDots, Text, useUI } from '@/components/ui';
import {
  createOrder,
  createOrderItem,
  createPayment,
  decreaseQuantity,
  deleteCart,
  getCarts,
  getProduct,
  getUser,
  updateOrder,
} from '@/lib/api';
import type { Cart, Product, User } from '@/types';

import s from '../components/cart/CartSidebarView/CartSidebarView.module.css';

type CheckoutFormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
};

const CheckoutPage = () => {
  const { push } = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [card, setCard] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(false);
  const { openModal, setModalView } = useUI();

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
  });

  const fetchUserInfo = useCallback(async () => {
    const token = JSON.parse(localStorage.getItem('token') || 'null');
    const res = await getUser(token);
    const user: User = res.data;
    setFormData({
      firstName: user.fname,
      lastName: user.lname,
      email: user.email,
      address: user.address,
      phoneNumber: user.phone_number,
    });
  }, []);

  const getCards = useCallback(async () => {
    const userId = JSON.parse(localStorage.getItem('token') || 'null');

    if (userId === '' || userId === null) {
      setModalView('LOGIN_VIEW');
      openModal();
      return;
    }

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

  const subtotal = products.reduce((a, b) => a + (b.price || 0), 0);

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

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = JSON.parse(localStorage.getItem('token') || 'null');

    if (userId === '' || userId === null) {
      setModalView('LOGIN_VIEW');
      openModal();
      return;
    }
    try {
      console.log('USER ID:', userId);
      const orderRes = await createOrder({
        user_id: userId,
        status: 'pending',
      });
      console.log('ORDER RES:', orderRes);
      const orderId = orderRes.data?.id;

      // create order items
      const orderItemsPromises = products.map(async (product) => {
        return createOrderItem({ order_id: orderId, product_id: product.id });
      });
      await Promise.all(orderItemsPromises);

      // delete all cards
      const deleteCartPromises = card.map(async (item) => {
        return deleteCart(item.id);
      });
      await Promise.all(deleteCartPromises);

      // create payment
      await createPayment({
        order_id: orderId,
        amount: subtotal.toString(),
      }).then(async () => {
        alert('Худалдан авалт амжилттай хийгдлээ');
        const ids = card.map((e) => e.product_id);
        decreaseQuantity({ products: ids });
      });

      await updateOrder(orderId, { status: 'paid' }).finally(() =>
        push('/user')
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Container className="h-screen w-full bg-primary py-16 shadow-xl">
      <h1 className="mb-8 text-3xl font-bold">Төлбөр төлөх</h1>
      <main className="flex gap-5">
        <form
          onSubmit={handleSubmit}
          className="w-3/4 rounded-md bg-primary p-5"
        >
          <Text variant="pageHeading" className="mb-5 border-b">
            Хэрэглэгчийн мэдээлэл
          </Text>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block font-bold" htmlFor="firstName">
                Нэр
              </label>
              <input
                className="w-full rounded-lg border border-gray-400 p-2"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="mb-2 block font-bold" htmlFor="lastName">
                Овог
              </label>
              <input
                className="w-full rounded-lg border border-gray-400 p-2"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-2 block font-bold" htmlFor="email">
              И-мэйл
            </label>
            <input
              className="w-full rounded-lg border border-gray-400 p-2"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 block font-bold" htmlFor="address">
              Гэрийн Хаяг
            </label>
            <input
              className="w-full rounded-lg border border-gray-400 p-2"
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <label className="mb-2 block font-bold" htmlFor="city">
                Утасны дугаар
              </label>
              <input
                className="w-full rounded-lg border border-gray-400 p-2"
                type="tel"
                id="phone"
                name="phone"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mt-8">
            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={products.length === 0}
            >
              {products.length === 0
                ? 'Your cart is empty'
                : `Худалдаж авах  ₮${subtotal.toFixed(0)}`}
            </Button>
          </div>
        </form>
        {products.length > 0 && (
          <div className="w-2/5 rounded-md p-5">
            <Text variant="pageHeading" className="mb-5 border-b">
              Таны сагс
            </Text>
            <ul className={clsx(s.lineItemsList)}>
              {products.map((item) => (
                <ProductItem key={item.id} product={item} remove={remove} />
              ))}
            </ul>
          </div>
        )}
      </main>
      {loading && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/10 backdrop-blur-sm">
          <LoadingDots />
        </div>
      )}
    </Container>
  );
};

CheckoutPage.Layout = Layout;

export default CheckoutPage;
