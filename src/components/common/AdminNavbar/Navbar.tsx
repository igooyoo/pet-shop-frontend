import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Cross, Menu } from '@/components/icons';
import { Logo } from '@/components/ui';
import { demos, type Item } from '@/lib/demos';

import s from './Navbar.module.css';

function GlobalNavItem({
  item,
  close,
}: {
  item: Item;
  close: () => false | void;
}) {
  const r = useRouter();
  const isActive = r.pathname === `/${item.slug}`;
  return (
    <Link
      onClick={close}
      href={`/${item.slug}`}
      className={clsx(s.item, {
        'bg-nav': !isActive,
        'bg-nav-item': isActive,
      })}
    >
      {`- ${item.name}`}
    </Link>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className={s.root}>
      <div className="h-full bg-nav shadow-lg drop-shadow-lg">
        <div className={s.header}>
          <Link href="/" className={s.logo} onClick={close}>
            <Logo isBlack={false} />
          </Link>
        </div>
        <button className={s.btn} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <Cross /> : <Menu />}
        </button>
        <div
          className={clsx(s.wrapper, {
            [s.open]: isOpen,
            hidden: !isOpen,
          })}
        >
          <nav className={s.nav}>
            {demos.map((section) => {
              return (
                <div key={section.name}>
                  <p className="mb-2 px-1.5 text-sm font-semibold tracking-wider text-white">
                    {section.name}
                  </p>

                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <GlobalNavItem
                        key={item.slug}
                        item={item}
                        close={close}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
          {/* <div className="absolute h-12 w-full px-2.5 lg:bottom-12">
            <Button
              variant="flat"
              className="h-full w-full"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
