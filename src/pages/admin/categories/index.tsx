/* eslint-disable no-alert */
import { useEffect, useState } from 'react';

import { AdminLayout } from '@/components/common/AdminLayout';
import { Text } from '@/components/ui';
import { deleteCategory, getCategories, getProducts } from '@/lib/api';
import type { Category, Product } from '@/types';

const Index = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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

  const onDelete = async (id: string) => {
    await deleteCategory(id)
      .then(() => {
        alert('Category deleted successfully');
        fetchCategories();
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div>
      <Text variant="pageHeading">Бүтээгдэхүүний төрлүүд</Text>
      <div className="grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category) => (
          <div
            key={category.id}
            className="relative h-24 rounded-md bg-primary p-4 shadow-xl"
          >
            <Text>
              <h6>{category.name}</h6>
            </Text>
            <span className="absolute right-1 top-1 rounded-md bg-primary p-3">
              <p className="text-xs">
                <strong>
                  {
                    products?.filter(
                      (product) => product.category_id === category.id
                    ).length
                  }{' '}
                </strong>
                бүдээгдэхүүн
              </p>
            </span>
            <button
              onClick={() => onDelete(category.id)}
              className="p-1 text-xs text-rose-500"
            >
              Устгах
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

Index.Layout = AdminLayout;
export default Index;
