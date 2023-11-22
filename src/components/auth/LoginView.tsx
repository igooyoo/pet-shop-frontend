/* eslint-disable no-console */
/* eslint-disable no-promise-executor-return */
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { login } from '@/lib/api';
import type { Login } from '@/types';

import { Button, Text, useUI } from '../ui';
import Input from '../ui/Input/Input';

const LoginView: React.FC = () => {
  const { closeModal, openModal, setModalView, setUserToken } = useUI();
  const [error, setError] = useState('');
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Login>();

  const onSubmit = async (data: Login) => {
    const body: Login = {
      user_name: data.user_name,
      password: data.password,
    };
    await login(body)
      .then((res) => {
        console.log('USER:', res.data);
        window.localStorage.setItem('token', JSON.stringify(res.data));
        setUserToken(res.data);
        closeModal();
        push('/user');
      })
      .catch((err) => {
        setError('Нэвтрэх нэр эсвэл нууц үг буруу байна.');
        console.log(err);
      });
  };

  const signup = () => {
    setModalView('SIGNUP_VIEW');
    openModal();
  };

  return (
    <div className="flex w-80 flex-col p-3">
      <Text variant="sectionHeading">Нэвтрэх</Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between gap-5"
      >
        <div>
          <Input placeholder="Username" {...register('user_name')} />
          <div className="h-5" />
          <Input
            placeholder="Password"
            {...register('password')}
            type="password"
          />
        </div>
        {error && <p className="text-center text-xs text-rose-400">{error}</p>}
        <Button type="submit" loading={isSubmitting}>
          Нэвтрэх
        </Button>
        <div className="flex items-center justify-between px-4">
          <Text>Бүртгэлгүй бол </Text>
          <button onClick={signup} className="font-bold hover:underline">
            Бүртгүүлэх
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
