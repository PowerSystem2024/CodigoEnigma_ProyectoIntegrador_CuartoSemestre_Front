import { NbMenuService, NbSearchService} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { NebularModule } from '../../shared/nebular-module';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { EventBusService } from '../../shared/event-bus.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [
      CommonModule,
      CartComponent,
      NebularModule,
    ]
})

export class HeaderComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user')!);
  activeOrder: Order | undefined;
  userMenu = [
    { title: 'Perfil', icon: 'person-outline' },
    { title: 'Ajustes', icon: 'settings-2-outline' },
    { title: 'Salir', icon: 'unlock-outline' },
  ];

  constructor(
    private menuService: NbMenuService, 
    private searchService: NbSearchService,
    private orderService: OrderService,
    private eventBusService: EventBusService
  ) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      console.log(data);
    })
  }

  ngOnInit(): void {
    const vm = this
    this.fetchActiveOrder();

    this.eventBusService.onEvent().subscribe(event => {
      if (event.type === 'cart-update') {
        vm.fetchActiveOrder();
      }
    });
  }

  fetchActiveOrder(): void {
    this.orderService.getActiveOrderByUser(this.user.id).subscribe((order: Order) => {
      if (order.hasOwnProperty('id')) {
        this.activeOrder = order;
      }
    });
  }

  getTotalItems(): string {
    if (this.activeOrder && this.activeOrder.order_products) {
      return this.activeOrder.order_products.reduce((total, op) => total + op.quantity, 0) + '';
    }
    return '';
  }
  
}