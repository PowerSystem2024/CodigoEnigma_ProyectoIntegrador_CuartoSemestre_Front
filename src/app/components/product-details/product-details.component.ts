import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { NebularModule } from '../../shared/nebular-module';
import { Category } from '../../models/category.model';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductService } from '../../services/product.service';
import { EventBusService } from '../../shared/event-bus.service';
import { NbLayoutModule, NbToastrModule, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    NebularModule,
    ProductItemComponent,
    NbLayoutModule,
    NbToastrModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product: Product = {} as Product;
  category: Category = {} as Category;
  amount: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private eventBusService: EventBusService,
    private toastrService: NbToastrService, 
  ) {}

  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];
    this.category = this.route.snapshot.data['category'];
  }

  changeAmount(change: number): void {
    const newAmount = this.amount + change;
    if (newAmount >= 1) {
      this.amount = newAmount;
    }
  }

  addToCart(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (currentUser) {
      this.productService.addToCart(this.product.id, {quantity: this.amount, user_id: currentUser.id}).subscribe({
        next: (response) => {
          this.toastrService.success(`Se agrego ${this.amount}x${this.product.name} al carrito`, 'Agregado!');
          this.eventBusService.emit({ type: 'cart-update', payload: 'Orders updated' });
        },
        error: (error) => {
          window.alert("Error al agregar el producto al carrito");
          this.toastrService.danger('Error al agregar el producto al carrito', 'Error!');
        }
      });
    } else {
      this.toastrService.danger('Para agregar productos al carrito por favor, inicia sesión o registrate.', 'Ingresa para usar el Carrito');
    }
  }

}
