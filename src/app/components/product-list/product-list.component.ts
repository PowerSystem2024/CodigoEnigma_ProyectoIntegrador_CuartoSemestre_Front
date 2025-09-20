import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    CommonModule,
    ProductItemComponent
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.products = this.route.snapshot.data['products'];
  }
}