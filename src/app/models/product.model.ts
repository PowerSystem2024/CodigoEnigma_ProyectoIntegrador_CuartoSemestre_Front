export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  care_level?: string;
  size?: string;
  quantity?: number;
}