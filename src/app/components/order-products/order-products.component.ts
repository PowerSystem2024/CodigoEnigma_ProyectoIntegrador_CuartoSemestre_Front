import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { NebularModule } from '../../shared/nebular-module';
import { Router } from '@angular/router';
import { NbListModule, NbButtonModule, NbIconModule, NbButtonGroupModule } from '@nebular/theme';

@Component({
  selector: 'app-order-products',
  standalone: true,
  templateUrl: './order-products.component.html',
  styleUrls: [
    './order-products.component.scss'
  ],
  imports: [
    CommonModule,
    NebularModule,
    NbListModule,
    NbButtonModule,
    NbIconModule,
    NbButtonGroupModule
  ]
})
export class OrderProductsComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() active: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  changeAmount(change: number, product: any): void {
    const newAmount = product.quantity + change;
    if (newAmount >= 1) {
      product.quantity = newAmount;
    }
  }

  getTotal(): number {
    return this.products.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);
  }

  goToProductDetail(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  removeProduct(productId: number): void {
    let remove = window.confirm("¿Está seguro que desea eliminar este producto del carrito?");
    if (remove) {
      this.products = this.products.filter(p => p.id !== productId);
    }
  }
}