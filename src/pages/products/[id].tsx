import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Layout } from '@/components/common/Layout';
import ProductView from '@/components/product/ProductView';
import { Button, Container } from '@/components/ui';
import { getProduct } from '@/lib/api';
import type { Product } from '@/types';

const Index = ({ id }: any) => {
  const { push } = useRouter();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProduct(id);
      const data = await res.data;
      setProduct(data);
    };
    fetchProduct();
  }, []);

  return (
    <Container className="space-y-12 py-12">
      <Button variant="slim" onClick={() => push('/')}>{`<- Буцах`}</Button>
      <div className="rounded-md bg-primary p-5 shadow-md drop-shadow-md">
        <ProductView product={product} />
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
