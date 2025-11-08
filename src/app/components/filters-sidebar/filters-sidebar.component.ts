import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NebularModule } from '../../shared/nebular-module';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-filters-sidebar',
  standalone: true,
  templateUrl: './filters-sidebar.component.html',
  styleUrls: ['./filters-sidebar.component.scss'],
  imports: [CommonModule, FormsModule, NebularModule]
})
export class FiltersSidebarComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() initialFilters: any = {};

  @Output() filtersChange = new EventEmitter<any>();

  selectedCategoryIds: number[] = [];
  searchTerm: string = '';
  minPrice?: number;
  maxPrice?: number;
  sizeInput: string = '';
  careInput: string = '';
  // 'all' -> todas las condiciones; 'any' -> cualquiera de las condiciones
  matchMode: 'all' | 'any' = 'all';

  ngOnInit(): void {
    if (this.initialFilters) {
      const f = this.initialFilters;
      // category_id can be comma-separated string
      if (f.category_id) {
        this.selectedCategoryIds = ('' + f.category_id)
          .split(',')
          .map((v: string) => Number(v))
          .filter((v: number) => !Number.isNaN(v));
      }
      if (f.search_query) this.searchTerm = '' + f.search_query;
      if (f.min_price) this.minPrice = Number(f.min_price);
      if (f.max_price) this.maxPrice = Number(f.max_price);
      if (f.size) this.sizeInput = '' + f.size;
      if (f.care) this.careInput = '' + f.care;
      if (f.modo && ('' + f.modo).toLowerCase() === 'or') this.matchMode = 'any';
    }
  }

  applyFilters(): void {
    const filter: any = {};

    if (this.selectedCategoryIds.length) {
      filter.category_id = this.selectedCategoryIds.join(',');
    }
    if (this.searchTerm?.trim()) filter.search_query = this.searchTerm.trim();
    if (this.minPrice != null) filter.min_price = this.minPrice;
    if (this.maxPrice != null) filter.max_price = this.maxPrice;
    if (this.sizeInput?.trim()) filter.size = this.sizeInput.trim();
    if (this.careInput?.trim()) filter.care = this.careInput.trim();
    // Solo enviamos 'modo=or' cuando el usuario elige "cualquiera de las condiciones"
    if (this.matchMode === 'any') filter.modo = 'or';

    this.filtersChange.emit(filter);
  }

  clearFilters(): void {
    this.selectedCategoryIds = [];
    this.searchTerm = '';
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.sizeInput = '';
    this.careInput = '';
    this.matchMode = 'all';
    this.filtersChange.emit({});
  }
}