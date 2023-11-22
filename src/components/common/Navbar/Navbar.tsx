/* eslint-disable no-underscore-dangle */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type FC, useCallback, useEffect, useState } from 'react';

import { CartMaterial } from '@/components/icons/CartMaterial';
import { Exit } from '@/components/icons/Exit';
import { Person } from '@/components/icons/Person';
import { Search } from '@/components/icons/Search';
import { Button, Logo, useUI } from '@/components/ui';
import { getUser } from '@/lib/api';
import type { User } from '@/types';

import s from './Navbar.module.css';
import NavbarRoot from './NavbarRoot';

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  links?: NavLink[];
}

const Navbar: FC<NavbarProps> = () => {
  const { openModal, setModalView, openSidebar, setSidebarView, userToken } =
    useUI();
  const [token, setToken] = useState<string | null | undefined>();
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserInfo = useCallback(async () => {
    const t = JSON.parse(localStorage.getItem('token') || 'null');
    if (t) {
      const res = await getUser(t);
      const { data } = res;
      const user = data as User;
      if (user?.type_ === 'ADMIN') setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('token') || 'null'));
    fetchUserInfo();
  }, [userToken]);

  const handleUserClick = () => {
    setModalView('LOGIN_VIEW');
    openModal();
  };

  const handleCartClick = () => {
    if (token === '' || token === null) {
      setModalView('LOGIN_VIEW');
      openModal();
      return;
    }
    setSidebarView('CART_VIEW');
    openSidebar();
  };

  const { push } = useRouter();

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    setToken('');
    push('/');
  };

  const handleSearch = () => {
    push('/products');
  };

  return (
    <NavbarRoot>
      <div className="mx-auto max-w-6xl px-6">
        <div className={s.nav}>
          <div className="flex items-center">
            <Link href="/">
              <span className={s.logo} aria-label="Logo">
                <Logo />
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-end space-x-8">
            <button type="button" onClick={handleSearch}>
              <Search />
            </button>
            <button type="button" onClick={handleCartClick}>
              <CartMaterial />
            </button>
            {token === '' || !token ? (
              <Button variant="slim" onClick={handleUserClick}>
                Нэвтрэх
              </Button>
            ) : (
              <>
                <button onClick={() => push('/user')}>
                  <Person />
                </button>
                {isAdmin && (
                  <Button
                    variant="slim"
                    onClick={() => push('/admin/products')}
                  >
                    Админ
                  </Button>
                )}
                <button type="button" onClick={handleLogout}>
                  <Exit />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </NavbarRoot>
  );
};

export default Navbar;
