import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { ActivatedRoute } from '@angular/router';
import { NebularModule } from '../../shared/nebular-module';
import { OrderService } from '../../services/order.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    NebularModule,
    CartComponent
  ],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.orders = this.route.snapshot.data['orders'];
    this.orders.forEach(order => {
      order.products.forEach(product => {
        const orderProductQuantity = order.order_products.find(op => op.product_id === product.id)?.quantity || 0;
        product.quantity = orderProductQuantity;
      });
    });
  }
}
