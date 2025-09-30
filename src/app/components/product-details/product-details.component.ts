import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { NebularModule } from '../../shared/nebular-module';
import { Category } from '../../models/category.model';
import { ProductItemComponent } from '../product-item/product-item.component';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];
    this.category = this.route.snapshot.data['category'];
    
    console.log(this.product, this.category);
  }

  changeAmount(change: number): void {
    const newAmount = this.amount + change;
    if (newAmount >= 1) {
      this.amount = newAmount;
    }
  }

  addToCart(): void {
    // LML: Cuando este el carrito, aca se llamara al servicio para agregar el producto al carrito
    console.log(`Added ${this.amount} of ${this.product.name} to cart.`);
  }

}
