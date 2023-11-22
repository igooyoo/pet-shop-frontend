/* eslint-disable no-alert */
/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Layout } from '@/components/common/Layout';
import { ProductCard } from '@/components/product/ProductCard';
import { Button, Container, useUI } from '@/components/ui';
import Input from '@/components/ui/Input/Input';
import {
  getOrderItems,
  getOrders,
  getProduct,
  getUser,
  updateUser,
} from '@/lib/api';
import { DateUtil } from '@/lib/date-util';
import type { Order, OrderItem, Product, Register, User } from '@/types';

export default function Profile() {
  const [products, setProducts] = useState<Product[]>([]);
  const { openModal, setModalView } = useUI();
  const [editable, setEditable] = useState(false);

  const [orders, setOrders] = useState<Order[]>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Register>();

  const fetchUserInfo = useCallback(async () => {
    setEditable(false);
    const token = JSON.parse(localStorage.getItem('token') || 'null');
    const res = await getUser(token);
    const { data } = res;
    const user = data as User;
    reset({
      fname: user.fname,
      lname: user.lname,
      address: user.address,
      phone_number: user.phone_number,
      user_name: user.user_name,
      email: user.email,
    });
  }, []);

  const onSubmit = async (data: Register) => {
    const body: Register = {
      ...data,
      gender: 'Male',
    };
    const token = JSON.parse(localStorage.getItem('token') || 'null');
    await updateUser(token, body)
      .then((res) => {
        console.log(res.data);
        fetchUserInfo();
        alert('Амжилттай хадгаллаа.');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchOrders = useCallback(async () => {
    const token = JSON.parse(localStorage.getItem('token') || 'null');

    if (token === '' || token === null) {
      setModalView('LOGIN_VIEW');
      openModal();
      return;
    }

    try {
      const res = await getOrders();
      const data = res.data?.items as Order[];
      const myOrders = data.filter((order) => order.user_id === token);
      setOrders(myOrders);

      const orderItemsRes = await getOrderItems();
      const orderItemsData = orderItemsRes.data?.items as OrderItem[];

      console.log('orderItemsData: ', orderItemsData);
      console.log('myorders"', data);

      const myOrderItems = orderItemsData.filter((item) =>
        myOrders.map((order) => order.id).includes(item.order_id)
      );

      const productIds = myOrderItems.map((item) => item.product_id);

      const promises = productIds.map((id) =>
        getProduct(id).then((response) => response.data)
      );
      const temp = await Promise.all(promises);
      setProducts(temp);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchUserInfo();
  }, [fetchOrders]);

  // console.log(orders ? orders[0] : 'not found');

  return (
    <Container className="flex flex-col gap-12 py-6 lg:flex-row">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full max-w-2xl flex-col justify-between gap-5"
      >
        <h1 className="text-2xl font-semibold">Хувийн мэдээлэл</h1>
        <div className="w-full">
          <Input
            placeholder="Овог"
            {...register('fname')}
            label="Овог"
            disabled={!editable}
          />
          <Input
            placeholder="Нэр"
            {...register('lname')}
            label="Нэр"
            disabled={!editable}
          />
          <Input
            placeholder="Гэрийн хаяг"
            {...register('address')}
            label="Гэрийн хаяг"
            disabled={!editable}
          />
          <Input
            placeholder="Утас"
            {...register('phone_number')}
            label="Утас"
            disabled={!editable}
          />
          <Input
            placeholder="Нэвтрэх нэр"
            {...register('user_name')}
            label="Нэвтрэх нэр"
            disabled={!editable}
          />
          <Input
            placeholder="Майл хаяг"
            {...register('email')}
            label="Майл хаяг"
            disabled={!editable}
          />
        </div>
        {editable && (
          <Button type="submit" loading={isSubmitting}>
            Хадгалах
          </Button>
        )}

        {!editable && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setEditable((e) => !e)}
          >
            Засах
          </Button>
        )}
      </form>

      <div className="w-full space-y-5">
        <h1 className="text-2xl font-semibold">Миний захиалгууд</h1>
        {products?.length === 0 ? (
          <div className="mt-12 flex flex-col ">
            <span className="text-sm font-semibold">
              Таньд захиалга байхгүй байна
            </span>
          </div>
        ) : (
          <>
            <ul className="flex flex-col space-y-5 rounded-md p-3 shadow-md">
              {orders?.map((e) => {
                return (
                  <li key={e.id}>
                    <div className="flex flex-col">
                      <span>
                        Захиалга хийсэн:{' '}
                        <strong>{DateUtil.parse(e.created_at)}</strong>
                      </span>
                      {/* <span>
                        Захиалгын төлөв:{' '}
                        <strong className="uppercase">{e.order_status}</strong>
                      </span> */}
                    </div>
                  </li>
                );
              })}
            </ul>
            <h2 className="text-xl font-semibold">Бараанууд</h2>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
              {products?.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

Profile.Layout = Layout;
