import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ActivatedRoute } from '@angular/router';
import { NebularModule } from '../../shared/nebular-module';
import { Category } from '../../models/category.model';
import { EventBusService } from '../../shared/event-bus.service';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';

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
export class ProductListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  products: Product[] = [];
  hasFilters: boolean = true;
  
  private eventSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventBusService: EventBusService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categories = this.route.snapshot.data['categories'];
    
    // Escuchar eventos de filtros desde el header
    this.eventSubscription = this.eventBusService.onEvent().subscribe(event => {
      if (event.type === 'product-filters-header') {
        this.applyFiltersFromHeader(event.payload);
      }
    });

    // Escuchar evento para limpiar filtros y volver a vista por categorías
    this.eventBusService.onEvent().subscribe(event => {
      if (event.type === 'clear-product-filters-header') {
        this.clearFilters();
      }
    });
  }

  ngOnDestroy(): void {
    // Limpiar suscripciones para evitar memory leaks
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  private applyFiltersFromHeader(filters: any): void {
    // Llamar al servicio de productos con los filtros recibidos del header
    console.log('Filtros recibidos desde el header:', filters);
    
    // Cambiar a vista de productos filtrados (sin categorías)
    this.hasFilters = false;
    
    this.productService.getProductsWithFilter(filters).subscribe({
      next: (products) => {
        this.products = products;
        console.log('Productos filtrados:', products);
      },
      error: (error) => {
        console.error('Error al filtrar productos:', error);
        // En caso de error, volver a mostrar por categorías
        this.hasFilters = true;
      }
    });
  }

  private clearFilters(): void {
    // Volver a vista por categorías
    this.hasFilters = true;
    this.products = [];
  }
}