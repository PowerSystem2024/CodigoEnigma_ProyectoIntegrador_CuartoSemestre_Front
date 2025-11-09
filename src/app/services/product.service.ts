import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}products`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProduct(id: string | number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl+`/${id}`);
  }

  addToCart(id: string | number, data: { quantity: number, user_id: number }): Observable<any> {
    return this.http.post<any>(this.baseUrl+`/${id}/add_to_cart`, data);
  }

  getProductsWithFilter(filter: any) {
    const params = Object.keys(filter)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`).join('&');

    const url = params ? `${this.baseUrl}?${params}` : this.baseUrl;

    return this.http.get<Product[]>(url);
  }

}
