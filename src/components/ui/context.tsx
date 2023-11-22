/* eslint-disable @typescript-eslint/naming-convention */
import type { FC, ReactNode } from 'react';
import React, { useCallback, useMemo } from 'react';

import { petCategories, products } from '@/mock';
import type { Category, Product } from '@/types';

export interface State {
  displaySidebar: boolean;
  displayDropdown: boolean;
  displayModal: boolean;
  sidebarView: string;
  modalView: string;
  userToken: string;

  products: Product[];
  categories: Category[];
}

const initialState = {
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: 'LOGIN_VIEW',
  sidebarView: 'CART_VIEW',
  userToken: '',
  products,
  categories: petCategories,
};

type Action =
  | {
      type: 'OPEN_SIDEBAR';
    }
  | {
      type: 'CLOSE_SIDEBAR';
    }
  | {
      type: 'OPEN_DROPDOWN';
    }
  | {
      type: 'CLOSE_DROPDOWN';
    }
  | {
      type: 'OPEN_MODAL';
    }
  | {
      type: 'CLOSE_MODAL';
    }
  | {
      type: 'SET_MODAL_VIEW';
      view: MODAL_VIEWS;
    }
  | {
      type: 'SET_SIDEBAR_VIEW';
      view: SIDEBAR_VIEWS;
    }
  | {
      type: 'SET_USER_TOKEN';
      value: string;
    }
  | {
      type: 'ADD_PRODUCT';
      value: Product;
    }
  | {
      type: 'ADD_CATEGORY';
      value: Category;
    };

type MODAL_VIEWS =
  | 'SIGNUP_VIEW'
  | 'LOGIN_VIEW'
  | 'FORGOT_VIEW'
  | 'NEW_SHIPPING_ADDRESS'
  | 'NEW_PAYMENT_METHOD';

type SIDEBAR_VIEWS = 'CART_VIEW' | 'CHECKOUT_VIEW' | 'PAYMENT_METHOD_VIEW';

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
      };
    }
    case 'OPEN_DROPDOWN': {
      return {
        ...state,
        displayDropdown: true,
      };
    }
    case 'CLOSE_DROPDOWN': {
      return {
        ...state,
        displayDropdown: false,
      };
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
        displaySidebar: false,
      };
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      };
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
      };
    }
    case 'SET_SIDEBAR_VIEW': {
      return {
        ...state,
        sidebarView: action.view,
      };
    }
    case 'SET_USER_TOKEN': {
      return {
        ...state,
        userToken: action.value,
      };
    }
    case 'ADD_PRODUCT': {
      return {
        ...state,
        products: [...state.products, action.value],
      };
    }
    case 'ADD_CATEGORY': {
      return {
        ...state,
        categories: [...state.categories, action.value],
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

export const UIProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openSidebar = useCallback(
    () => dispatch({ type: 'OPEN_SIDEBAR' }),
    [dispatch]
  );
  const closeSidebar = useCallback(
    () => dispatch({ type: 'CLOSE_SIDEBAR' }),
    [dispatch]
  );
  const toggleSidebar = useCallback(
    () =>
      state.displaySidebar
        ? dispatch({ type: 'CLOSE_SIDEBAR' })
        : dispatch({ type: 'OPEN_SIDEBAR' }),
    [dispatch, state.displaySidebar]
  );
  const closeSidebarIfPresent = useCallback(
    () => state.displaySidebar && dispatch({ type: 'CLOSE_SIDEBAR' }),
    [dispatch, state.displaySidebar]
  );

  const openDropdown = useCallback(
    () => dispatch({ type: 'OPEN_DROPDOWN' }),
    [dispatch]
  );
  const closeDropdown = useCallback(
    () => dispatch({ type: 'CLOSE_DROPDOWN' }),
    [dispatch]
  );

  const openModal = useCallback(
    () => dispatch({ type: 'OPEN_MODAL' }),
    [dispatch]
  );
  const closeModal = useCallback(
    () => dispatch({ type: 'CLOSE_MODAL' }),
    [dispatch]
  );

  const setUserToken = useCallback(
    (value: string) => dispatch({ type: 'SET_USER_TOKEN', value }),
    [dispatch]
  );

  const setModalView = useCallback(
    (view: MODAL_VIEWS) => dispatch({ type: 'SET_MODAL_VIEW', view }),
    [dispatch]
  );

  const setSidebarView = useCallback(
    (view: SIDEBAR_VIEWS) => dispatch({ type: 'SET_SIDEBAR_VIEW', view }),
    [dispatch]
  );

  const addProduct = useCallback(
    (value: Product) => dispatch({ type: 'ADD_PRODUCT', value }),
    [dispatch]
  );

  const addCategory = useCallback(
    (value: Category) => dispatch({ type: 'ADD_CATEGORY', value }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openDropdown,
      closeDropdown,
      openModal,
      closeModal,
      setModalView,
      setSidebarView,
      setUserToken,
      addCategory,
      addProduct,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext: FC<{ children?: ReactNode }> = ({
  children,
}) => <UIProvider>{children}</UIProvider>;
