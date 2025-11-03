import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { NebularModule } from '../../shared/nebular-module';
import { Category } from '../../models/category.model';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductService } from '../../services/product.service';
import { EventBusService } from '../../shared/event-bus.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    NebularModule,
    ProductItemComponent,
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
    private eventBusService: EventBusService
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
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.productService.addToCart(this.product.id, {quantity: this.amount, user_id: user.id}).subscribe({
        next: (response) => {
          window.alert("Producto agregado al carrito");
          this.eventBusService.emit({ type: 'cart-update', payload: 'Orders updated' });
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
