import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ActivatedRoute } from '@angular/router';
import { NebularModule } from '../../shared/nebular-module';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    CommonModule,
    ProductItemComponent,
    NebularModule
  ]
})
export class ProductListComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  hasFilters: boolean = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categories = this.route.snapshot.data['categories'];
  }
}