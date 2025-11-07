import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { NebularModule } from '../../shared/nebular-module';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { EventBusService } from '../../shared/event-bus.service';

@Component({
  selector: 'app-order-products',
  standalone: true,
  templateUrl: './order-products.component.html',
  styleUrls: [
    './order-products.component.scss',
    './../../../styles.scss'
  ],
  imports: [
    CommonModule,
    NebularModule,
  ]
})
export class OrderProductsComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() active: boolean = false;
  @Input() loading?: boolean = false;
  @Output() loadingChange = new EventEmitter<boolean>();
  private debounceTimer: any;
  private oldQuantityDictionary: any = {};

  constructor(
    private router: Router,
    private productService: ProductService,
    private orderService: OrderService,
    private eventBus: EventBusService
  ) {}

  ngOnInit(): void {
    // Filtrar productos con cantidad 0 al inicializar
    this.products = this.products.filter(product => product.quantity && product.quantity > 0);
    this.products.forEach(prod => this.oldQuantityDictionary[prod.id] = prod.quantity)
  }

  changeAmount(change: number, product: any): void {
    const newAmount = product.quantity + change;

    if (newAmount >= 1) {
      product.quantity = newAmount;
      this.setLoading(true);
      clearTimeout(this.debounceTimer);

      this.debounceTimer = setTimeout(() => {
        const userData = JSON.parse(localStorage.getItem('currentUser') || '');
        const vm = this;
        this.orderService.changeProdAmount(userData.id, product.id, newAmount).subscribe({
          next: (res: any) => {
            product.quantity = newAmount;
            vm.oldQuantityDictionary[product.id] = newAmount;

            // Emitir evento para notificar que el carrito se actualizó
            vm.eventBus.emit({
              type: 'cart-update',
              payload: 'Product quantity changed'
            });

            this.setLoading(false);
          },
          error: (err) => {
            product.quantity = vm.oldQuantityDictionary[product.id];
            window.alert(`Hubo un problema al cambiar la cantidad de ${product.name}`);
            this.setLoading(false);
          }
        });
      }, 750);
    } else if (newAmount === 0) {
      // Si la cantidad llega a 0, eliminar el producto
      this.removeProduct(product.id);
    }
  }

  setLoading(value: boolean) {
    this.loading = value;
    this.loadingChange.emit(value);
  }

  getTotal(): number {
    return this.products.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);
  }

  goToProductDetail(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  removeProduct(productId: number): void {
    // Usar confirmación nativa en lugar del diálogo de Nebular
    const confirmed = window.confirm('¿Está seguro que desea eliminar este producto de la orden?');

    if (confirmed) {
      this.setLoading(true);
      const userData = JSON.parse(localStorage.getItem('currentUser') || '');
      const vm = this;

      console.log('Eliminando producto:', productId, 'para usuario:', userData.id);

      // Usar el mismo método que changeProdAmount pero con cantidad 0
      this.orderService.removeProductFromOrder(userData.id, productId).subscribe({
        next: (res: any) => {
          console.log('Respuesta del servidor al eliminar:', res);
          // Eliminar el producto de la lista local
          vm.products = vm.products.filter(p => p.id !== productId);
          delete vm.oldQuantityDictionary[productId];

          // Emitir evento para notificar que el carrito se actualizó
          vm.eventBus.emit({
            type: 'cart-update',
            payload: 'Product removed from cart',
            productId: productId,
            action: 'remove'
          });

          // Usar alert nativo en lugar de Nebular toastr
          window.alert('Producto eliminado del carrito correctamente');
          this.setLoading(false);
        },
        error: (err) => {
          console.error('Error al eliminar producto:', err);
          // Usar alert nativo en lugar de Nebular toastr
          window.alert('Hubo un problema al eliminar el producto del carrito');
          this.setLoading(false);
        }
      });
    }
  }

  addToCart(product: any): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.productService.addToCart(product.id, {quantity: product.quantity,user_id: user.id}).subscribe({
        next: (response) => {
          window.alert("Producto agregado al carrito");
        },
        error: (error) => {
          window.alert("Error al agregar el producto al carrito");
        }
      });
    } else {
      window.alert("Por favor, inicie sesión para agregar productos al carrito.");
    }
  }
}
