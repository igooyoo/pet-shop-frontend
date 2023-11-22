import axios from 'axios';

import { API_URL } from '@/config';
import type {
  CreateCart,
  CreateCategory,
  CreateComment,
  CreateOrder,
  CreateOrderItem,
  CreatePayment,
  CreateProduct,
  Login,
  Register,
} from '@/types';

export const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Category
export const getCategories = () => instance.get('/categories?limit=100');
export const getCategory = (id: string) => instance.get(`/categories/${id}`);
export const createCategory = (data: CreateCategory) =>
  instance.post('/categories', data);
export const updateCategory = (id: string, data: CreateCategory) =>
  instance.put(`/categories/${id}`, data);
export const deleteCategory = (id: string) =>
  instance.delete(`/categories/${id}`);

// Product
export const getProducts = () => instance.get('/products?limit=100');
export const getProduct = (id: string) => instance.get(`/products/${id}`);
export const createProduct = (data: CreateProduct) =>
  instance.post('/products', data);
export const updateProduct = (id: string, data: CreateProduct) =>
  instance.put(`/products/${id}`, data);
export const deleteProduct = (id: string) => instance.delete(`/products/${id}`);

export const imageUpload = (base64: string, id: string) =>
  instance.put(
    `/${id}/product_image`,
    { image: base64 },
    { maxBodyLength: Infinity }
  );

export const catImageUpload = (base64: string, id: string) =>
  instance.put(
    `/${id}/category_image`,
    { image: base64 },
    { maxBodyLength: Infinity }
  );

export const searchProduct = (query: string) => {
  const data = JSON.stringify({
    search_value: query,
  });
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://127.0.0.1:8536/petsshop/v1/search',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };
  return axios.request(config);
};

// Order
export const getOrders = () => instance.get('/orders?limit=100');
export const getOrder = (id: string) => instance.get(`/orders/${id}`);
export const createOrder = (data: CreateOrder) =>
  instance.post('/orders', data);
export const updateOrder = (id: string, data: { status: string }) =>
  instance.put(`/orders/${id}`, data);
export const deleteOrder = (id: string) => instance.delete(`/orders/${id}`);

// Payment
export const getPayments = () => instance.get('/payments?limit=100');
export const getPayment = (id: string) => instance.get(`/payments/${id}`);
export const createPayment = (data: CreatePayment) =>
  instance.post('/payments', data);
export const updatePayment = (id: string, data: CreatePayment) =>
  instance.put(`/payments/${id}`, data);
export const deletePayment = (id: string) => instance.delete(`/payments/${id}`);

export const decreaseQuantity = (data: { products: string[] }) => {
  instance.post(`/descrease_quantity`, data);
};

// OrderItems
export const getOrderItems = () => instance.get('/order_items?limit=100');
export const getOrderItem = (id: string) => instance.get(`/order_items/${id}`);
export const createOrderItem = (data: CreateOrderItem) =>
  instance.post('/order_items', data);
export const updateOrderItem = (id: string, data: CreateOrderItem) =>
  instance.put(`/order_items/${id}`, data);
export const deleteOrderItem = (id: string) =>
  instance.delete(`/order_items/${id}`);

// Comment
export const getComments = () => instance.get('/comments?limit=100');
export const getComment = (id: string) => instance.get(`/comments/${id}`);
export const createComment = (data: CreateComment) =>
  instance.post('/comments', data);
export const updateComment = (id: string, data: CreateComment) =>
  instance.put(`/comments/${id}`, data);
export const deleteComment = (id: string) => instance.delete(`/comments/${id}`);

// Cart
export const getCarts = () => instance.get('/cards?limit=100');
export const getCart = (id: string) => instance.get(`/cards/${id}`);
export const createCart = (data: CreateCart) => instance.post('/cards', data);
export const updateCart = (id: string, data: CreateCart) =>
  instance.put(`/cards/${id}`, data);
export const deleteCart = (id: string) => instance.delete(`/cards/${id}`);

// AUTH
export const login = (data: Login) => instance.post('/login', data);
export const createUser = (data: Register) => instance.post('/users', data);
export const updateUser = (id: string, data: Register) =>
  instance.put(`/users/${id}`, data);

export const getUser = (id: string) => instance.get(`/users/${id}`);

export const getReport = () => instance.get(`/reports`);
