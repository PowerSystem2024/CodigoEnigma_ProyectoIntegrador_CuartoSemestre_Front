import { Component, OnInit } from '@angular/core';
import { FeaturedProductsComponent } from '../featured-products/featured-products.component';
import { Category } from '../../models/category.model';
import { ActivatedRoute } from '@angular/router';
import { NebularModule } from '../../shared/nebular-module';
import { ProductItemComponent } from '../product-item/product-item.component';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NebularModule,
    FeaturedProductsComponent,
    ProductItemComponent,
    HeroComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: Category[] = [];
  featuredCategory?: Category;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.categories = this.route.snapshot.data['featured'];
    this.featuredCategory = this.categories[0];
  }
}
