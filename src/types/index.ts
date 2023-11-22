export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  category_id?: string;
  created_by?: string;
  created_at?: string;
  updated_by?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug?: string;
  image?: string;
}

export interface Cart {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_date: string;
  order_status: string;
  created_by: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  created_by: string;
  created_at: string;
}

export interface Comment {
  id: string;
  user_id: string;
  product_id: string;
  comment: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}

// CRUD
export type CreateCategory = {
  name: string;
  parent: string;
};

export type CreateProduct = {
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  category_id: string;
};

export type CreateOrder = {
  user_id: string;
  status: string;
};

export type CreatePayment = {
  order_id: string;
  amount: string;
};

export type CreateOrderItem = {
  order_id: string;
  product_id: string;
};

export type CreateComment = {
  user_id: string;
  product_id: string;
  comment: string;
};

export type CreateCart = {
  user_id: string;
  product_id: string;
};

export type Login = {
  user_name: string;
  password: string;
};

export type Register = {
  fname: string;
  lname: string;
  gender?: string;
  email: string;
  phone_number: string;
  address: string;
  user_name: string;
  // password
  pwd: string;
};

export type User = {
  id: string;
  fname: string;
  lname: string;
  gender: string;
  email: string;
  phone_number: string;
  address: string;
  user_name: string;
  pwd: string;
  type_: string;
};
