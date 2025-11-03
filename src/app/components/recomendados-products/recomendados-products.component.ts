import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-recomendados-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recomendados-products.component.html',
  styleUrls: ['./recomendados-products.component.scss']
})
export class RecomendadosProductsComponent implements OnInit, OnDestroy {
  productos: Product[] = [
    { id: 1, name: 'Anturio Chocolate', price: 59.99, description: 'Planta exótica con flores oscuras', image_url: 'assets/img/Anturio_chocolate_2.webp' },
    { id: 2, name: 'Anturio Rojo', price: 29.99, description: 'Planta vibrante de fácil cuidado', image_url: 'assets/img/Anturio_rojo_1.jpg' },
    { id: 3, name: 'Anturio Zizou', price: 19.99, description: 'Planta decorativa en canasta', image_url: 'assets/img/Anturio_zizou_en_canasta.webp' },
    { id: 4, name: 'Anturio Blanco', price: 39.99, description: 'Planta elegante con flores blancas', image_url: 'assets/img/Anturio_blanco.jpg' },
    { id: 5, name: 'Monstera Deliciosa', price: 49.99, description: 'Planta tropical de hojas grandes', image_url: 'assets/img/monstera-deliciosa.jpg' },
    { id: 6, name: 'Ficus Lyrata', price: 34.99, description: 'Árbol de interior con hojas violin', image_url: 'assets/img/Ficus_lyrata.jpg' },
    { id: 7, name: 'Calathea Orbifolia', price: 44.99, description: 'Planta de hojas redondas y coloridas', image_url: 'assets/img/Calathea_orbifolia.jpg' },
    { id: 8, name: 'Pothos Dorado', price: 24.99, description: 'Planta trepadora de fácil mantenimiento', image_url: 'assets/img/Pothos_dorado.webp' },
    
  ];
displayedProductos: Product[] = [];           // Lista visible de productos (duplicada para carrusel infinito)
currentIndex: number = 0;                    // Índice actual del slide mostrado
itemsToShow: number = 1;                     // Cantidad de items visibles a la vez (1 = un producto)
hasTransition: boolean = true;               // Controla si se aplica transición CSS (smooth)
intervalId: any;                             // ID del intervalo para autoplay

ngOnInit() {                                 // Se ejecuta al iniciar el componente
  this.displayedProductos = [...this.productos, ...this.productos]; // Duplica la lista para efecto infinito
  this.startAutoPlay();                      // Inicia el cambio automático de slides
}

ngOnDestroy() {                              // Se ejecuta al destruir el componente
  this.stopAutoPlay();                       // Detiene el autoplay para evitar memory leaks
}

nextSlide() {                                // Avanza al siguiente slide
  this.hasTransition = true;                 // Activa transición suave
  this.currentIndex += 1;                    // Incrementa el índice
  if (this.currentIndex >= this.displayedProductos.length / 2) { // Si llega al final de la lista original
    this.hasTransition = false;              // Desactiva transición (salto instantáneo)
    this.currentIndex = 0;                   // Vuelve al inicio
    setTimeout(() => {                       // Pequeña pausa para resetear sin salto visible
      this.hasTransition = true;             // Reactiva transición
    }, 50);
  }
}

prevSlide() {                                // Retrocede al slide anterior
  this.hasTransition = true;                 // Activa transición
  this.currentIndex -= 1;                    // Decrementa el índice
  if (this.currentIndex < 0) {               // Si va antes del inicio
    this.hasTransition = false;              // Salto instantáneo al final de la lista original
    this.currentIndex = this.displayedProductos.length / 2 - 1;
    setTimeout(() => {
      this.hasTransition = true;             // Reactiva transición después del salto
    }, 50);
  }
}

startAutoPlay() {                            // Inicia el autoplay cada 3 segundos
  this.intervalId = setInterval(() => {
    this.nextSlide();                        // Llama a nextSlide cada 3000ms
  }, 3000);
}

stopAutoPlay() {                             // Detiene el autoplay
  if (this.intervalId) {
    clearInterval(this.intervalId);          // Limpia el intervalo
  }
}

addToCart(productName: string) {             // Simula añadir al carrito
  alert(`¡${productName} agregado al carrito!`); // Muestra alerta
}

get transformStyle() {                       // Estilo CSS dinámico para el deslizamiento
  return `translateX(-${this.currentIndex * 100}%)`; // Mueve el contenedor horizontalmente
}
}