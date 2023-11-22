import cn from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';

import { Facebook } from '@/components/icons/Facebook';
import { Instagram } from '@/components/icons/Instagram';
import { Youtube } from '@/components/icons/Youtube';
import { Logo, Text } from '@/components/ui';
import { ADDRESS, SERVICES } from '@/mock';

import s from './Footer.module.css';

interface Props {
  className?: string;
  children?: any;
  pages?: string[];
}

const links = [
  {
    name: 'Туслах цэс',
    url: '#',
    item: SERVICES,
  },
  {
    name: 'Холбоо барих',
    url: '#',
    item: ADDRESS,
  },
];

const Footer: FC<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className);

  return (
    <footer className={rootClassName}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 transition-colors duration-150 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-6">
          <Link href="/" passHref>
            <Logo isBlack={false} />
          </Link>
          <p className="mt-5 w-72 text-sm text-accent-2">
            Гэрийн тэжээвэр амьтдын хоол, амттан болон дагалдах хэрэгслийн эрэлт
            хэрэгцээг таньд хүргэхийн төлөө
          </p>
          <div className="mt-5 flex gap-5">
            <Facebook className="h-6 w-6 text-accent-0" />
            <Instagram className="h-6 w-6 text-accent-0" />
            <Youtube className="h-6 w-6 text-accent-0" />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-6">
          <div className="mx-auto flex max-w-3xl justify-between">
            {...links.map((page) => (
              <ul key={page.url} className="mx-1 flex flex-1 flex-col">
                <Text className="mb-2 w-full">
                  <h6 className="text-accent-2">{page.name}</h6>
                </Text>
                {page.item?.map((item) => (
                  <li key={item}>
                    <p className="mb-2 text-xs text-accent-2">{item}</p>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 pb-10 pt-6 text-xs text-accent-5 md:flex-row">
        <div className="text-center font-light">© 2023 Made For Pets</div>
      </div>
    </footer>
  );
};

export default Footer;
