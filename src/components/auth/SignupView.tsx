/* eslint-disable no-console */
/* eslint-disable no-promise-executor-return */
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createUser } from '@/lib/api';
import type { Register } from '@/types';

import { Button, Text, useUI } from '../ui';
import Input from '../ui/Input/Input';

const SignUpView: React.FC = () => {
  const { closeModal, openModal, setModalView } = useUI();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Register>();

  const login = () => {
    setModalView('LOGIN_VIEW');
    openModal();
  };

  const onSubmit = async (data: Register) => {
    const body: Register = {
      ...data,
      gender: 'Male',
    };
    await createUser(body)
      .then(() => {
        closeModal();
        login();
      })
      .catch((err) => {
        setError('Бүртгэл амжилтгүй боллоо.');
        console.log(err);
      });
  };

  return (
    <div className="flex w-80 flex-col p-3">
      <Text variant="sectionHeading">Бүртгүүлэх</Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between gap-5"
      >
        <div>
          <Input placeholder="Овог" {...register('fname')} />
          <div className="h-5" />
          <Input placeholder="Нэр" {...register('lname')} />
          <div className="h-5" />
          <Input placeholder="Гэрийн хаяг" {...register('address')} />
          <div className="h-5" />
          <Input placeholder="Утас" {...register('phone_number')} />
          <div className="h-5" />
          <Input placeholder="Нэвтрэх нэр" {...register('user_name')} />
          <div className="h-5" />
          <Input placeholder="Нууц үг" {...register('pwd')} type="password" />
          <div className="h-5" />
          <Input placeholder="Майл хаяг" {...register('email')} />
        </div>
        {error && <p className="text-center text-xs text-rose-400">{error}</p>}
        <Button type="submit" loading={isSubmitting}>
          Бүртгүүлэх
        </Button>
        <div className="flex items-center justify-between px-4">
          <Text>Бүртгэлтэй байгаа бол</Text>
          <button onClick={login} className="font-bold hover:underline">
            Нэвтрэх
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpView;
