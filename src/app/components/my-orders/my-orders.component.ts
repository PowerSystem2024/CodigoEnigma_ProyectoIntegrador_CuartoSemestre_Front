import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { ActivatedRoute } from '@angular/router';
import { NebularModule } from '../../shared/nebular-module';
import { CartComponent } from '../cart/cart.component';
import { OrderService } from '../../services/order.service';
import { EventBusService } from '../../shared/event-bus.service';

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
    private orderService: OrderService,
    private eventBus: EventBusService
  ) {}

  ngOnInit(): void {
    const userOrders = this.route.snapshot.data['orders'];
    
    // Mostrar la orden activa (carrito) en "Mis pedidos"
    this.orders = userOrders || [];
    
    this.processOrders();

    // Escuchar eventos de actualización del carrito
    this.eventBus.onEvent().subscribe(event => {
      if (event.type === 'cart-update') {
        console.log('MyOrders: Recibido evento cart-update', event);
        
        // Si es una eliminación de producto, dar tiempo para que se procese
        if (event.payload === 'Product removed from cart') {
          console.log('MyOrders: Producto eliminado, esperando antes de actualizar');
          setTimeout(() => {
            this.refreshActiveOrder();
          }, 500);
        } else {
          console.log('MyOrders: Actualizando carrito inmediatamente');
          this.refreshActiveOrder();
        }
      }
    });
  }

  private processOrders(): void {
    this.orders.forEach(order => {
      this.processOrderProducts(order);
    });
  }

  private processOrderProducts(order: Order): void {
    if (order.products && order.order_products) {
      // Filtrar productos con cantidad 0
      order.products = order.products.filter(product => {
        const orderProductQuantity = order.order_products.find(op => op.product_id === product.id)?.quantity || 0;
        return orderProductQuantity > 0;
      });

      // Asignar cantidades
      order.products.forEach(product => {
        const orderProductQuantity = order.order_products.find(op => op.product_id === product.id)?.quantity || 0;
        product.quantity = orderProductQuantity;
      });
    }
  }

  private refreshActiveOrder(): void {
    const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!userData.id) {
      console.log('MyOrders: No hay usuario logueado');
      return;
    }

    console.log('MyOrders: Actualizando orden activa para usuario:', userData.id);

    // Refrescar la orden activa desde el servidor
    this.orderService.getActiveOrderByUser(userData.id).subscribe({
      next: (updatedOrder: Order) => {
        if (updatedOrder.hasOwnProperty('id')) {
          console.log('MyOrders: Carrito actualizado desde el servidor:', updatedOrder);
          this.processOrderProducts(updatedOrder);
          const index = this.orders.findIndex(order => order.id === updatedOrder.id);
          if (index !== -1) {
            this.orders[index] = updatedOrder;
          }
          console.log('MyOrders: Órdenes después de la actualización:', this.orders);
        } else {
          console.log('MyOrders: No se recibió una orden válida del servidor');
        }
      },
      error: (err) => {
        console.error('MyOrders: Error al actualizar carrito:', err);
      }
    });
  }
}
