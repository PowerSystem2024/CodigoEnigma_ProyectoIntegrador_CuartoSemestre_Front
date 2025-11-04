import { Category } from "./category.model";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  categories: Category[];
  quantity?: number;
}