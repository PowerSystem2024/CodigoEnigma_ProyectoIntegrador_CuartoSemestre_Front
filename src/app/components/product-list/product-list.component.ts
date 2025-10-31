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
  size: string | null = null;
  private filtersSub: Subscription = new Subscription();

  constructor(private productService: ProductService, private filtersService: FiltersService) {}

  ngOnInit(): void {
    console.log('🛒 ProductListComponent inicializado');
    // Suscribirse a filtros globales desde el header
    this.filtersSub = this.filtersService.filters$.subscribe((f: ProductFilters) => {
      this.searchTerm = f.search_query || '';
      this.minPrice = f.min_price ?? null;
      this.maxPrice = f.max_price ?? null;
      this.size = f.size ?? null;
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
      
      // Handle comma-separated sizes (e.g., "Chica,Mediana")
      let matchesSize = true;
      if (this.size) {
        const allowedSizes = this.size.split(',').map(s => s.trim().toLowerCase());
        matchesSize = allowedSizes.includes((product.size || '').toLowerCase());
      }
      
      return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesSize;
    });
  }

  // Los filtros se controlan desde el Header; aquí sólo aplicamos en memoria como fallback

  hasActiveFilters(): boolean {
    return !!(this.searchTerm || this.minPrice != null || this.maxPrice != null || this.size);
  }

  getSelectedSizes(): string[] {
    return this.size ? this.size.split(',').map(s => s.trim()).filter(s => s) : [];
  }

  clearFilter(key: 'search_query' | 'min_price' | 'max_price' | 'size') {
    const patch: any = {};
    switch (key) {
      case 'search_query': patch.search_query = ''; break;
      case 'min_price': patch.min_price = null; break;
      case 'max_price': patch.max_price = null; break;
      case 'size': patch.size = null; break;
    }
    this.filtersService.setFilters(patch);
  }

  clearSingleSize(sizeToRemove: string) {
    const sizes = this.getSelectedSizes();
    const newSizes = sizes.filter(s => s !== sizeToRemove);
    this.filtersService.setFilters({ size: newSizes.length > 0 ? newSizes.join(',') : null });
  }
}