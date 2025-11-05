import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { NebularModule } from '../../shared/nebular-module';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { NbToastrService } from '@nebular/theme';

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
  @Input() loading?: boolean = false;
  @Output() loadingChange = new EventEmitter<boolean>();
  private debounceTimer: any;
  private oldQuantityDictionary: any = {};

  constructor(
    private router: Router,
    private productService: ProductService,
    private orderService: OrderService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.products.forEach(prod => this.oldQuantityDictionary[prod.id] = prod.quantity)
  }

  changeAmount(change: number, product: any): void {
    const newAmount = product.quantity + change;
    
    if (newAmount >= 1) {
      product.quantity = newAmount;
      this.setLoading(true);
      clearTimeout(this.debounceTimer);

      this.debounceTimer = setTimeout(() => {
        const userData = JSON.parse(localStorage.getItem('currentUser') || '');
        const vm = this;
        this.orderService.changeProdAmount(userData.id, product.id, newAmount).subscribe({
          next: (res: any) => {
            product.quantity = newAmount;
            vm.oldQuantityDictionary[product.id] = newAmount;
            this.setLoading(false);
          },
          error: (err) => {
            product.quantity = vm.oldQuantityDictionary[product.id];
            vm.toastrService.danger(`Hubo un problema al cambiar la cantidad de ${product.name}`, 'Error');
            this.setLoading(false);
          }
        });
      }, 750);
    }
  }

  setLoading(value: boolean) {
    this.loading = value;
    this.loadingChange.emit(value);
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