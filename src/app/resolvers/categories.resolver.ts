// categorys.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

export const categoriesResolver: ResolveFn<Category[]> = () => {
  const categoryService = inject(CategoryService);
  return categoryService.getCategoriesWithProducts();
};