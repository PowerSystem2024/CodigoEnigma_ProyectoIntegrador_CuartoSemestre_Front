import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OrderProductsComponent } from '../order-products/order-products.component';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { NebularModule } from '../../shared/nebular-module';
import { Router } from '@angular/router';
import { EventBusService } from '../../shared/event-bus.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    imports: [
        CommonModule,
        OrderProductsComponent,
        NebularModule
    ]
})

export class CartComponent implements OnChanges {
    @Input() order: Order | undefined;
    @Input() parentClass: string = '';
    isLoading: boolean = false;

    constructor(
        private orderService: OrderService,
        private router: Router,
        private eventBus: EventBusService,
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['order'] && this.order) {
            console.log('Cart ngOnChanges - Nueva orden recibida:', this.order);
            this.processOrder();
        }
    }

    ngOnInit() {
        if (this.order) {
            this.processOrder();
        }

        // Escuchar eventos de actualización del carrito
        this.eventBus.onEvent().subscribe(event => {
            if (event.type === 'cart-update' && this.order) {
                console.log('Cart: Recibido evento cart-update, reprocesando orden');
                setTimeout(() => this.processOrder(), 100);
            }
        });
    }

    private processOrder() {
        if (this.order && this.order.products) {
            console.log('Cart processOrder - Order original:', this.order);
            console.log('Cart processOrder - Productos originales:', this.order.products);
            console.log('Cart processOrder - Order products:', this.order.order_products);

            // Filtrar productos con cantidad 0 o undefined
            const validProducts = this.order.products.filter(product => {
                const orderProductQuantity = this.order?.order_products.find(op => op.product_id === product.id)?.quantity || 0;
                const shouldInclude = orderProductQuantity > 0;
                console.log(`Producto ${product.name} (ID: ${product.id}): quantity=${orderProductQuantity}, incluir=${shouldInclude}`);
                return shouldInclude;
            });

            console.log('Cart processOrder - Productos después del filtro:', validProducts);

            // Asignar cantidades a los productos válidos
            validProducts.forEach(product => {
                const orderProductQuantity = this.order?.order_products.find(op => op.product_id === product.id)?.quantity || 0;
                product.quantity = orderProductQuantity;
                console.log(`Asignando cantidad ${orderProductQuantity} al producto ${product.name}`);
            });

            // Actualizar la orden con productos filtrados
            this.order.products = validProducts;
        }
    }

    closeOrder(orderId: number): void {
        const vm = this
        let remove = window.confirm("Esta seguro que desea cancelar esta Orden?");
        if (remove) {
            this.orderService.closeOrder(orderId).subscribe(() => {
                vm.order!.status = 'closed';
            });
        }
    }

    payOrder(orderId: number) {
        const vm = this
        const userData = JSON.parse(localStorage.getItem('currentUser') || '');
        this.orderService.payOrder(orderId, userData.id).subscribe((response) => {
            const html = `<html><body><script>window.location.href = "${response.payment_url}";</script></body></html>`;
            const blob = new Blob([html], { type: 'text/html' });
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, '_blank');
            vm.orderService.pendingOrder(orderId).subscribe(() => {
                vm.order!.status = 'pending';
                vm.router.navigate(['/my-orders']);
            });
        });
    }


}
