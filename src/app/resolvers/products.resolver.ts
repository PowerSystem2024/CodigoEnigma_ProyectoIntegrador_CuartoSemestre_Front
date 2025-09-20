// products.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

export const productsResolver: ResolveFn<Product[]> = () => {
  const productService = inject(ProductService);
  return productService.getProducts();
};