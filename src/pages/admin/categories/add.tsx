/* eslint-disable no-alert */
/* eslint-disable no-promise-executor-return */
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { AdminLayout } from '@/components/common/AdminLayout';
import { Button, Text } from '@/components/ui';
import Input from '@/components/ui/Input/Input';
import { catImageUpload, createCategory } from '@/lib/api';
import type { CreateCategory } from '@/types';

type CateogryFormValues = {
  name: string;
  description: string;
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
    formState: { isSubmitting },
  } = useForm<CateogryFormValues>();

  const { push } = useRouter();

  const onSubmit = async (data: CateogryFormValues) => {
    const file = data.image[0];
    const base64 = await fileToBase64(file);

    const body: CreateCategory = {
      name: data.name,
      parent: data.description,
    };

    let productId;

    await createCategory(body).then((res) => {
      productId = res.data?.id;
      alert('Category added successfully');
      push('/admin/categories');
    });

    if (productId) {
      await catImageUpload(base64, productId);
    }
  };

  return (
    <div>
      <Text variant="pageHeading">Төрөл ангилал</Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl gap-5 rounded-md bg-primary px-4 py-3 shadow-md drop-shadow-md"
      >
        <Input
          label="Төрлийн нэр"
          placeholder="Name"
          {...register('name' as const, { required: true })}
          className="mb-4 w-full rounded-md border border-accent-2 bg-accent-0 p-2 outline-none"
        />
        <Input
          label="Төрлийн тайлбар"
          placeholder="Description"
          {...register('description' as const, { required: true })}
          className="mb-4 w-full rounded-md border border-accent-2 bg-accent-0 p-2 outline-none"
        />
        <Input
          label="Зураг"
          placeholder="Image"
          type="file"
          {...register('image' as const, { required: true })}
          className="mb-4 w-full rounded-md border border-accent-2 bg-accent-0 p-2 outline-none"
        />
        <Button type="submit" className="mt-5 w-full" loading={isSubmitting}>
          Save
        </Button>
      </form>
    </div>
  );
};

Index.Layout = AdminLayout;
export default Index;
