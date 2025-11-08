import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NebularModule } from '../../shared/nebular-module';
import { Category } from '../../models/category.model';
import { FiltersSidebarComponent } from '../filters-sidebar/filters-sidebar.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    CommonModule,
    ProductItemComponent,
    NebularModule,
    FiltersSidebarComponent,
  ]
})
export class ProductListComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  hasFilters: boolean = true;

  isLoading: boolean = false;
  initialFilters: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.categories = this.route.snapshot.data['categories'];
    this.route.queryParams.subscribe((params) => {
      const hasAny = Object.keys(params || {}).length > 0;
      this.initialFilters = params;
      if (hasAny) {
        this.applyFilters(params);
      } else {
        this.hasFilters = true;
        this.products = [];
      }
    });
  }

  onFiltersChange(filter: any): void {
    // Actualiza la URL con los filtros
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filter,
      queryParamsHandling: 'replace',
    });
    this.applyFilters(filter);
  }

  private applyFilters(filter: any): void {
    const hasAny = Object.keys(filter || {}).length > 0;
    if (!hasAny) {
      this.hasFilters = true;
      this.products = [];
      return;
    }
    this.isLoading = true;
    this.productService.getProductsWithFilter(filter).subscribe((products: Product[]) => {
      this.products = products;
      this.hasFilters = false;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }
}