import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}orders`;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(this.baseUrl+`/${id}`);
  }

  getActiveOrderByUser(userId: string): Observable<Order> {
    console.log('OrderService: Obteniendo orden activa para usuario:', userId);
    return this.http.get<Order>(this.baseUrl+`/by-user/${userId}/active`).pipe(
      tap((response: Order) => {
        console.log('OrderService: Respuesta del backend para orden activa:', response);
      })
    );
  }

  getOrdersByUser(userId: string): Observable<Order> {
    return this.http.get<Order>(this.baseUrl+`/by-user/${userId}`);
  }

  changeProdAmount(userId: number, productId: number, newAmount: number) {
    return this.http.patch<Order>(`${this.baseUrl}/by-user/${userId}/active/change-product-amount`, {product_id: productId, quantity: newAmount});
  }

  removeProductFromOrder(userId: number, productId: number) {
    // Usar el endpoint existente con cantidad 0 para eliminar el producto
    const url = `${this.baseUrl}/by-user/${userId}/active/change-product-amount`;
    const body = {product_id: productId, quantity: 0};
    console.log('Enviando petición de eliminación:', { url, body });
    return this.http.patch<Order>(url, body);
  }

  closeOrder(orderId: number): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${orderId}/change-status`, {status: 'closed'});
  }

  pendingOrder(orderId: number): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${orderId}/change-status`, {status: 'pending'});
  }

  payOrder(orderId: number, userId: number): Observable<any> {
    return this.http.post<Order>(`${environment.apiUrl}payments/create`, {"order_id": orderId, "user_id": userId});
  }

}
