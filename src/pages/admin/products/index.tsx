/* eslint-disable no-alert */
import { useEffect, useState } from 'react';

import { AdminLayout } from '@/components/common/AdminLayout';
import { ProductCard } from '@/components/product/ProductCard';
import { Text } from '@/components/ui';
import { deleteProduct, getProducts } from '@/lib/api';
import type { Product } from '@/types';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    const res = await getProducts();
    const data = await res.data?.items;
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const hadnleDelete = async (id: string) => {
    await deleteProduct(id)
      .then(() => {
        alert('Product deleted successfully');
        fetchProducts();
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  };

  return (
    <div>
      <div className="mb-5">
        <Text variant="pageHeading">Бүтээгдэхүүнүүд</Text>
        <p>Нийт: {products?.length}</p>
      </div>
      <section>
        <div className="grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products?.map((product, index) => (
            <ProductCard
              index={index}
              key={product.id}
              product={product}
              handleDelete={() => hadnleDelete(product.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

Index.Layout = AdminLayout;
export default Index;
