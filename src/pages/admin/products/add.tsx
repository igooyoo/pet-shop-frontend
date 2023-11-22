/* eslint-disable no-alert */
/* eslint-disable no-promise-executor-return */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { AdminLayout } from '@/components/common/AdminLayout';
import { Button, Text } from '@/components/ui';
import Input from '@/components/ui/Input/Input';
import { Select } from '@/components/ui/Select';
import { createProduct, getCategories, imageUpload } from '@/lib/api';
import type { Category, CreateProduct } from '@/types';

type ProductFormValues = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category_id: string;
  image: FileList;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      const base64 = base64String.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

const Index = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ProductFormValues>();
  const [categories, setCategories] = useState<Category[]>([]);
  const { push } = useRouter();

  const fetchCategories = async () => {
    const res = await getCategories();
    const data = await res.data?.items;
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async (data: ProductFormValues) => {
    const file = data.image[0];
    const base64 = await fileToBase64(file);

    const body: CreateProduct = {
      name: data.name,
      description: data.description,
      price: parseInt(data.price.toString(), 10),
      quantity: parseInt(data.quantity.toString(), 10),
      image: 'gg',
      category_id: data.category_id,
    };

    let productId;

    await createProduct(body)
      .then((res) => {
        productId = res.data?.id;
        alert('Product added successfully');
        push('/admin/products');
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
    if (productId) {
      await imageUpload(base64, productId);
    }
  };

  return (
    <div>
      <Text variant="pageHeading">Бүтээгдэхүүн нэмэх</Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl gap-5 rounded-md px-4 py-3 shadow-md drop-shadow-md"
      >
        <Input
          placeholder="Name"
          label="Бүтээгдэхүүний нэр"
          {...register('name' as const, { required: true })}
          className="mb-4 w-full rounded-md border border-accent-2 bg-accent-0 p-2 outline-none"
        />
        <Select<ProductFormValues>
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
          control={control}
          registerName="category_id"
          label="Төрөл ангилал"
        />
        <Input
          placeholder="Price"
          label="Үнэ"
          type="number"
          {...register('price' as const, { required: true })}
          className="mb-4 w-full rounded-md border border-accent-2 bg-accent-0 p-2 outline-none"
        />
        <Input
          label="Тоо ширхэг"
          placeholder="Quantity"
          type="number"
          className="mb-4 w-full rounded-md border border-accent-2 bg-accent-0 p-2 outline-none"
          {...register('quantity' as const, { required: true })}
        />
        <Input
          label="Зураг"
          placeholder="Image"
          type="file"
          {...register('image' as const, { required: true })}
          className="mb-4 w-full rounded-md border border-accent-2 bg-accent-0 p-2 outline-none"
        />
        <textarea
          placeholder="Тайлбар"
          className="h-48 w-full rounded-md border border-accent-2 bg-accent-0 p-2 outline-none"
          {...register('description' as const, { required: true })}
        />
        <Button type="submit" className="mt-5 w-full" loading={isSubmitting}>
          Хадгалах
        </Button>
      </form>
    </div>
  );
};

Index.Layout = AdminLayout;
export default Index;
