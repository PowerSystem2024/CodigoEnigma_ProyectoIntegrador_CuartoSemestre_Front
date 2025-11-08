import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NebularModule } from '../../shared/nebular-module';
import { Category } from '../../models/category.model';

type MatchMode = 'and' | 'or';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NebularModule],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {
  @Input() categories: Category[] = [];
  @Output() apply = new EventEmitter<any>();
  @Output() clear = new EventEmitter<void>();

  // opciones (alineadas con lo que guardás en DB)
  sizes = ['Pequeña', 'Mediana', 'Grande'];
  careLevels = ['Bajo', 'Moderado', 'Alto'];

  form = this.fb.group({
    search_query: [''],
    category_id: [[] as number[]],
    min_price: [''],
    max_price: [''],
    size: [[] as string[]],
    care: [[] as string[]],
    modo: ['and' as MatchMode],
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    const raw = this.form.getRawValue();

    // Construimos el objeto de query tal como espera tu backend:
    const filter: any = {};

    if (raw.search_query?.trim()) {
      // permitimos términos separados por espacios o comas → backend espera coma
      filter.search_query = raw.search_query
        .split(/[,\s]+/).filter(Boolean).join(',');
    }
    if (raw.category_id?.length) {
      filter.category_id = raw.category_id.join(',');
    }
    if (raw.min_price) filter.min_price = raw.min_price;
    if (raw.max_price) filter.max_price = raw.max_price;

    if (raw.size?.length) filter.size = raw.size.join(',');
    if (raw.care?.length) filter.care = raw.care.join(',');

    if (raw.modo && (raw.modo === 'or' || raw.modo === 'and')) {
      filter.modo = raw.modo;
    }

    this.apply.emit(filter);
  }

  reset() {
    this.form.reset({
      search_query: '',
      category_id: [],
      min_price: '',
      max_price: '',
      size: [],
      care: [],
      modo: 'and',
    });
    this.clear.emit();
  }
}
