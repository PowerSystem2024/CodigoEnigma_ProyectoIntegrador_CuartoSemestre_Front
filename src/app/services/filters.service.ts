import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Modo = 'and' | 'or';

export interface ProductFilters {
  search_query?: string;
  min_price?: number | null;
  max_price?: number | null;
  size?: string | null;
  care?: string | null;
  category_id?: number | null;
  modo?: Modo | null;
}

const defaultFilters: ProductFilters = {
  search_query: '',
  min_price: null,
  max_price: null,
  size: null,
  care: null,
  category_id: null,
  modo: 'and',
};

@Injectable({ providedIn: 'root' })
export class FiltersService {
  private filtersSubject = new BehaviorSubject<ProductFilters>({ ...defaultFilters });
  public filters$ = this.filtersSubject.asObservable();

  get current() {
    return this.filtersSubject.value;
  }

  setFilters(partial: Partial<ProductFilters>) {
    this.filtersSubject.next({ ...this.current, ...partial });
  }

  reset() {
    this.filtersSubject.next({ ...defaultFilters });
  }
}