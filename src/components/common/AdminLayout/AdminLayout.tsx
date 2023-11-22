import cn from 'clsx';
import dynamic from 'next/dynamic';
import type { LinkProps } from 'next/link';
import React from 'react';

import LoginView from '@/components/auth/LoginView';
import SignupView from '@/components/auth/SignupView';
import { CartSidebarView } from '@/components/cart';
import { LoadingDots, Sidebar, useUI } from '@/components/ui';

import Navbar from '../AdminNavbar/Navbar';
import s from './Layout.module.css';

const Loading = () => (
  <div className="flex h-80 w-80 items-center justify-center p-3 text-center">
    <LoadingDots />
  </div>
);

const dynamicProps = {
  loading: Loading,
};

const Modal = dynamic(() => import('@/components/ui/Modal'), {
  ...dynamicProps,
  ssr: false,
});

export interface Props {
  pageProps: {
    pages?: [];
  };
  children?: React.ReactNode;
}

const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({
  modalView,
  closeModal,
}) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === 'LOGIN_VIEW' && <LoginView />}
      {modalView === 'SIGNUP_VIEW' && <SignupView />}
    </Modal>
  );
};

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? (
    <ModalView modalView={modalView} closeModal={closeModal} />
  ) : null;
};

const SidebarView: React.FC<{
  sidebarView: string;
  closeSidebar(): any;
  links: LinkProps[];
}> = ({ sidebarView, closeSidebar }) => {
  return (
    <Sidebar onClose={closeSidebar}>
      {sidebarView === 'CART_VIEW' && <CartSidebarView />}
    </Sidebar>
  );
};

const SidebarUI: React.FC<{ links: LinkProps[] }> = ({ links }) => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI();
  return displaySidebar ? (
    <SidebarView
      links={links}
      sidebarView={sidebarView}
      closeSidebar={closeSidebar}
    />
  ) : null;
};

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={cn(s.root)}>
      <Navbar />
      <main className="fit py-6 pl-72">{children}</main>
      <ModalUI />
      <SidebarUI links={[]} />
    </div>
  );
};

export default AdminLayout;
