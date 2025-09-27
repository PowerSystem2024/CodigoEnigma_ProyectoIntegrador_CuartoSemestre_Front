import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { NbLayoutModule } from "@nebular/theme";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ProductListComponent,
    NbLayoutModule
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-app';
}