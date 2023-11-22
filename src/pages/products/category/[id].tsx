import clsx from 'clsx';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Layout } from '@/components/common/Layout';
import { ProductListForHome } from '@/components/product/ProductListForHome';
import { Container } from '@/components/ui';
import { getCategories, getProducts } from '@/lib/api';
import { getRandomImage } from '@/mock';
import type { Category, Product } from '@/types';

const Index = ({ id }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      const data = await res.data?.items;
      setCategories(data);
    };
    const fetchProducts = async () => {
      const res = await getProducts();
      const data = await res.data?.items;
      setProducts(data);
    };
    fetchProducts();
    fetchCategories();
  }, []);

  const productsData = products.filter((p) => p.category_id === id);
  const active = categories?.find((p) => p.id === id);

  return (
    <Container className="space-y-12 py-12">
      <section className="flex gap-5">
        {categories?.map((category) => (
          <Link
            href={`/products/category/${category.id}`}
            key={category.id}
            className={clsx(
              'min-w-[120px] cursor-pointer rounded-md border-b-2 border-transparent px-8 py-2 shadow-md transition-all duration-300 hover:border-black/20',
              {
                'bg-secondary text-accent-0': active?.id === category.id,
              }
            )}
          >
            <h3 className="text-center text-sm font-semibold">
              {category.name}
            </h3>
          </Link>
        ))}
      </section>
      <div className="my-5 rounded-md">
        {active && (
          <div className="relative cursor-pointer overflow-hidden bg-white shadow-lg">
            <div
              className={clsx(
                'relative h-96 rounded-md bg-primary shadow-md drop-shadow-md'
              )}
            >
              <img
                src={
                  active.image
                    ? `data:image/jpeg;base64,${active.image}`
                    : getRandomImage()
                }
                alt={active.name}
                className="absolute h-full w-full rounded-md object-cover transition-all"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-end justify-end rounded-md bg-black/50 p-3">
              <h3 className="mb-1 font-semibold text-accent-0">
                {active.name}
              </h3>
            </div>
          </div>
        )}
      </div>
      <div className="rounded-md bg-primary p-5  shadow-md">
        {productsData.length === 0 ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold">
              Одоогоор бүтээгдэхүүн байхгүй байна
            </h3>
          </div>
        ) : (
          <ProductListForHome products={productsData} />
        )}
      </div>
    </Container>
  );
};

Index.Layout = Layout;

export default Index;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id;
  return {
    props: {
      id,
    },
  };
};
