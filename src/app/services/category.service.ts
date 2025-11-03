import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(this.baseUrl+`/${id}`);
  }

  getCategoriesWithProducts(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl+`/with_products/`);
  }

  getCategoryWithProducts(id: string): Observable<Category> {
    return this.http.get<Category>(this.baseUrl+`/with_products/${id}`);
  }

  getFeatured(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl+'/featured');
  }
}