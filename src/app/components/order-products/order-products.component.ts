import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { NebularModule } from '../../shared/nebular-module';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-order-products',
  standalone: true,
  templateUrl: './order-products.component.html',
  styleUrls: [
    './order-products.component.scss',
    './../../../styles.scss'
  ],
  imports: [
    CommonModule,
    NebularModule,
  ]
})
export class OrderProductsComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() active: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
  ) {}

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
    let remove = window.confirm("Esta seguro que desea eliminar este producto de la orden?");
    if (remove) {
      this.products = this.products.filter(p => p.id !== productId);
    }
  }

  addToCart(product: any): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.productService.addToCart(product.id, {quantity: product.quantity,user_id: user.id}).subscribe({
        next: (response) => {
          window.alert("Producto agregado al carrito");
        },
        error: (error) => {
          window.alert("Error al agregar el producto al carrito");
        }
      });
    } else {
      window.alert("Por favor, inicie sesión para agregar productos al carrito.");
    }
  }
}