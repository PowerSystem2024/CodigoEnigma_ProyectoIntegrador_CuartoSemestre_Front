import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products/`;

  constructor(private http: HttpClient) { }

  // Backend params: category_id, search_query, min_price, max_price, size, care, modo
  getProducts(filters?: {
    category_id?: number | null,
    search_query?: string,
    min_price?: number | null,
    max_price?: number | null,
    size?: string | null,
    care?: string | null,
    modo?: 'and' | 'or' | null
  }): Observable<Product[]> {
    let params = new HttpParams();
    const f = filters || {};
    if (f.category_id != null) params = params.set('category_id', String(f.category_id));
    if (f.search_query) params = params.set('search_query', f.search_query);
    if (f.min_price != null) params = params.set('min_price', String(f.min_price));
    if (f.max_price != null) params = params.set('max_price', String(f.max_price));
    if (f.size) params = params.set('size', f.size);
    if (f.care) params = params.set('care', f.care);
    if (f.modo) params = params.set('modo', f.modo);

    console.log('🔍 Llamando a API:', this.baseUrl, 'con params:', params.toString());
    return this.http.get<Product[]>(this.baseUrl, { params }).pipe(
      tap(products => console.log('✅ Productos recibidos:', products)),
      catchError(error => {
        console.error('❌ Error al obtener productos:', error);
        return throwError(() => error);
      })
    );
  }

  getProduct(id: string): Observable<Product> {
    console.log('🔍 Llamando a API para producto:', `${this.baseUrl}${id}`);
    return this.http.get<Product>(`${this.baseUrl}${id}`).pipe(
      tap(product => console.log('✅ Producto recibido:', product)),
      catchError(error => {
        console.error('❌ Error al obtener producto:', error);
        return throwError(() => error);
      })
    );
  }
  
}