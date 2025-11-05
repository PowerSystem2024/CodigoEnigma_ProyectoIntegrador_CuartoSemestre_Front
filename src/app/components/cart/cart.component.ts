import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { OrderProductsComponent } from '../order-products/order-products.component';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { NebularModule } from '../../shared/nebular-module';
import { Router } from '@angular/router';

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

export class CartComponent {
    @Input() order: Order | undefined;
    @Input() parentClass: string = '';
    isLoading: boolean = false;
    
    constructor(
        private orderService: OrderService,
        private router: Router,
    ) {}

    ngOnInit() {
        if (this.order && this.order.products) {
            this.order?.products.forEach(product => {
                const orderProductQuantity = this.order?.order_products.find(op => op.product_id === product.id)?.quantity || 0;
                product.quantity = orderProductQuantity;
            });
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