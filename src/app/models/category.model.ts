import { Product } from "./product.model";

export interface Category {
  id: number;
  name: string;
  slug: number;
  is_featured: boolean;
  products: Product[];
}