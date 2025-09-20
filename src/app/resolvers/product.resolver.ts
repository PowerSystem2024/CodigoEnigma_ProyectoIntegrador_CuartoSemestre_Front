// products.resolver.ts
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

export const productResolver: ResolveFn<Product> = (route: ActivatedRouteSnapshot) => {
  const productService = inject(ProductService);
  const id = route.paramMap.get('id')!;
  return productService.getProduct(id);
};