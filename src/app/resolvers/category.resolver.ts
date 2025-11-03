// categorys.resolver.ts
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

export const categoryResolver: ResolveFn<Category> = (route: ActivatedRouteSnapshot) => {
  const categoryService = inject(CategoryService);
  // LML: Se comenta hasta tener filtros, poner en id la que corresponda a tu db
  // const id = route.paramMap.get('category_id')!;
  const id = '5';
  return categoryService.getCategoryWithProducts(id);
};