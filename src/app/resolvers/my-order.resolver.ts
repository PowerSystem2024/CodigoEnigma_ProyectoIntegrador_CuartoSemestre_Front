// my-orders.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';

export const myOrdersResolver: ResolveFn<Order> = () => {
  const orderService = inject(OrderService);
  const user = JSON.parse(localStorage.getItem('currentUser')!);
  return orderService.getActiveOrderByUser(user.id);
};
