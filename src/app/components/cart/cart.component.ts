import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderProductsComponent } from '../order-products/order-products.component';
import { Product } from '../../models/product.model';
import { NebularModule } from '../../shared/nebular-module';

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

export class CartComponent implements OnInit {
    products: Product[] = [];

    constructor() {}

    ngOnInit() {
        // Por ahora, productos de ejemplo. En el futuro, esto vendrá del servicio de carrito
        this.products = [
            {
                id: 1,
                name: 'Producto de ejemplo',
                price: 100,
                description: 'Descripción detallada del producto en el carrito',
                image_url: 'https://via.placeholder.com/60',
                care_level: 'Bajo',
                size: 'Mediano',
                quantity: 2
            }
        ];
    }
}