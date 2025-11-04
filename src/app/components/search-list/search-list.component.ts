import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { NebularModule } from '../../shared/nebular-module';
import { NbDialogRef } from '@nebular/theme';

@Component({
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss'],
    imports: [
      CommonModule,
      ProductItemComponent,
      FormsModule,
      NebularModule,
  ]
})

export class SearchListComponent {
  products: Product[] = [];
  searchTerm: string = '';
  notFound: boolean = false;

  constructor(
    private productService: ProductService,
    protected dialogRef: NbDialogRef<SearchListComponent>
  ) {}

  searchProducts() {
    this.notFound = false;
    this.productService
      .getProductsWithFilter({ search_query: this.searchTerm })
      .subscribe((products: Product[]) => {
        this.products = products;
        if (products.length == 0) this.notFound = true;
      });
  }

  close() {
    this.dialogRef.close();
  }
}