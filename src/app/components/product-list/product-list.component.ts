import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { FiltersService, ProductFilters } from '../../services/filters.service';

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
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  private filtersSub: Subscription = new Subscription();

  constructor(private productService: ProductService, private filtersService: FiltersService) {}

  ngOnInit(): void {
    console.log('🛒 ProductListComponent inicializado');
    // Suscribirse a filtros globales desde el header
    this.filtersSub = this.filtersService.filters$.subscribe((f: ProductFilters) => {
      this.searchTerm = f.search_query || '';
      this.minPrice = f.min_price ?? null;
      this.maxPrice = f.max_price ?? null;
      this.loadProducts(f); // intentar filtrar en el backend
    });
    // Primera carga
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.filtersSub.unsubscribe();
  }

  loadProducts(filters?: ProductFilters) {
    this.productService.getProducts(filters).subscribe({
      next: (products) => {
        this.products = products;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchTerm || product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesMinPrice = this.minPrice === null || product.price >= this.minPrice;
      const matchesMaxPrice = this.maxPrice === null || product.price <= this.maxPrice;
      return matchesSearch && matchesMinPrice && matchesMaxPrice;
    });
  }

  // Los filtros se controlan desde el Header; aquí sólo aplicamos en memoria como fallback
}