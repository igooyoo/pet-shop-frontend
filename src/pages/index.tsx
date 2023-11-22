import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CategoryGridList } from '@/components/category/CategoryGridList';
import Layout from '@/components/common/Layout/Layout';
import { ProductListForHome } from '@/components/product/ProductListForHome';
import { Button, Container, Hero, Text } from '@/components/ui';
import { getCategories, getProducts } from '@/lib/api';
import type { Category, Product } from '@/types';

export default function Home() {
  const { push } = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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

    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <Container className="space-y-12 py-24">
      <section>
        <Hero description="Гэрийн тэжээвэр амьтдын хоол, амттан болон дагалдах хэрэгслийн эрэлт хэрэгцээг таньд хүргэхийн төлөө" />
      </section>
      <section className="pt-12 md:pt-24">
        <Text variant="pageHeading" className="my-6 w-full text-center">
          Манай бүтээгдэхүүнүүд
        </Text>
        <ProductListForHome products={products} />
        <div className="mt-12 flex w-full items-center justify-center">
          <Button variant="slim" onClick={() => push('/products')}>
            Бүгдийг харах
          </Button>
        </div>
      </section>
      <section className="pt-12">
        <CategoryGridList categories={categories} />
      </section>
    </Container>
  );
}

Home.Layout = Layout;
