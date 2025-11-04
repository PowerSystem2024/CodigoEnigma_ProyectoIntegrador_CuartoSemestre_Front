import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { NebularModule } from '../../shared/nebular-module';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [
    CommonModule,
    NebularModule,
    CurrencyPipe
  ],
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  @Input() products: Product[] = [];
  @Input() category!: Category;
  
  currentIndex: number = 0;
  itemsToShow: number = 1;
  hasTransition: boolean = true;
  intervalId: any;

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  nextSlide() {
    this.hasTransition = true;
    this.currentIndex += 1;
    if (this.currentIndex >= this.products.length / 2) {
      this.hasTransition = false;
      this.currentIndex = 0;
      setTimeout(() => {
        this.hasTransition = true;
      }, 50);
    }
  }

  prevSlide() {
    this.hasTransition = true;
    this.currentIndex -= 1;
    if (this.currentIndex < 0) {
      this.hasTransition = false;
      this.currentIndex = this.products.length / 2 - 1;
      setTimeout(() => {
        this.hasTransition = true;
      }, 50);
    }
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get transformStyle() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }
}