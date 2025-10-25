import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(this.baseUrl+`/${id}`);
  }

  getActiveOrderByUser(userId: string): Observable<Order> {
    return this.http.get<Order>(this.baseUrl+`/by-user/${userId}/active`);
  }

  getOrdersByUser(userId: string): Observable<Order> {
    return this.http.get<Order>(this.baseUrl+`/by-user/${userId}`);
  }

  closeOrder(orderId: number): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${orderId}/change-status`, {status: 'closed'});
  }
  
}