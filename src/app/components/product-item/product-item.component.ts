import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss'],
    imports: [CommonModule]
})

export class ProductItemComponent {
  @Input() product!: Product;

  ngOnInit() {
    console.log(this.product);
  }

  addToCart() {
    console.log('Agregado:', this.product);
  }
}