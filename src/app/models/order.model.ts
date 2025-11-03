import { Product } from "./product.model";

export interface Order {
  id: number;
  user_id: number;
  total: number;
  status: string;
  date: string;
  order_products: OrderProduct[];
  products: Product[];
}

export interface OrderProduct {
  id: number;
  product_id: number;
  quantity: number;
  order_id: number;
}