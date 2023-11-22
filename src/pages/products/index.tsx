/* eslint-disable no-nested-ternary */
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Layout } from '@/components/common/Layout';
import { ProductListForHome } from '@/components/product/ProductListForHome';
import { Container, LoadingDots } from '@/components/ui';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import { getCategories, getProducts, searchProduct } from '@/lib/api';
import type { Category, Product } from '@/types';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isSearching, setIsSearching] = useState(false);

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

  const search = async (searchTerm: string) => {
    setIsSearching(true);
    await searchProduct(searchTerm)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        setProducts([]);
      });
  };

  const onSearch = (searchTerm: string) => {
    search(searchTerm);
  };

  return (
    <Container className="space-y-12 py-12">
      <section className="flex flex-wrap gap-5">
        {categories?.map((category) => (
          <Link
            href={`/products/category/${category.id}`}
            key={category.id}
            className={clsx(
              'min-w-[120px] cursor-pointer rounded-md border-b-2 border-transparent px-8 py-2 shadow-md transition-all duration-300 hover:border-black/20'
            )}
          >
            <h3 className="text-center text-sm font-semibold">
              {category.name}
            </h3>
          </Link>
        ))}
      </section>
      <SearchInput onSearch={onSearch} />
      <section>
        {products.length > 0 ? (
          <ProductListForHome products={products} />
        ) : isSearching ? (
          <div className="flex w-full items-center justify-center">
            Хайлт олдсонгүй
          </div>
        ) : (
          <div className="flex w-full items-center justify-center">
            <LoadingDots />
          </div>
        )}
      </section>
    </Container>
  );
};

Index.Layout = Layout;

export default Index;
