import { NbMenuService, NbSearchService, NbDialogService, NbDialogRef, NbPopoverModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { NebularModule } from '../../shared/nebular-module';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { EventBusService } from '../../shared/event-bus.service';
import { RegisterDialogComponent } from '../../auth/register-dialog/register-dialog.component';
import { LoginDialogComponent } from '../../auth/login-dialog/login-dialog.component';
import { LogoutDialogComponent } from '../../auth/logout-dialog/logout-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [
      CommonModule,
      CartComponent,
      NebularModule,
      NbPopoverModule
    ]
})
export class HeaderComponent implements OnInit {
  currentUser: any = null;
  isLoggedIn = false;
  activeOrder: Order | undefined;

  constructor(
    private orderService: OrderService,
    private eventBusService: EventBusService,
    private dialogService: NbDialogService,
    private menuService: NbMenuService,
    private searchService: NbSearchService,
    private router: Router
  ) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      console.log(data);
    })
  }

  ngOnInit(): void {
    const vm = this
    
    console.log('🚀 HeaderComponent inicializado');
    this.checkAuthStatus();
    this.setupAuthListener();

    // TODO CAMBIAR ESTO A EVENTBUSSERVICE
    window.addEventListener('storage', (event) => {
      console.log('🔄 Evento storage detectado:', event.key);
      if (event.key === 'currentUser') {
        this.checkAuthStatus();
      }
    });

    if(this.isLoggedIn) {
      this.fetchActiveOrder();
    }

    this.eventBusService.onEvent().subscribe(event => {
      if (event.type === 'cart-update') {
        vm.fetchActiveOrder();
      }
    });
  }

  fetchActiveOrder(): void {
    this.orderService.getActiveOrderByUser(this.currentUser.id).subscribe((order: Order) => {
      if (order.hasOwnProperty('id')) {
        this.activeOrder = order;
      }
    });
  }

  getTotalItems(): string {
    if (this.activeOrder && this.activeOrder.order_products) {
      return this.activeOrder.order_products.reduce((total, op) => total + op.quantity, 0) + '';
    }
    return '';
  }
 
  // Verificar si hay usuario logueado
  private checkAuthStatus(): void {
    const userData = localStorage.getItem('currentUser');
    console.log('📦 Datos en localStorage (currentUser):', userData);

    if (userData) {
      try {
        this.currentUser = JSON.parse(userData);
        this.isLoggedIn = true;
        console.log('🔍 Usuario parseado correctamente:', this.currentUser);
        console.log('👤 Nombre del usuario:', this.currentUser?.name);
      } catch (error) {
        console.error('❌ Error al parsear usuario:', error);
      }
    } else {
      this.currentUser = null;
      this.isLoggedIn = false;
      console.log('❌ No hay usuario logueado en localStorage');
    }
  }

  // Escuchar cambios dentro de la misma pestaña
  private setupAuthListener(): void {
    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;

    const self = this;

    localStorage.setItem = function(key: string, value: string) {
      originalSetItem.apply(this, [key, value]);
      if (key === 'currentUser') {
        setTimeout(() => self.checkAuthStatus(), 0);
      }
    };

    localStorage.removeItem = function(key: string) {
      originalRemoveItem.apply(this, [key]);
      if (key === 'currentUser') {
        setTimeout(() => self.checkAuthStatus(), 0);
      }
    };
  }

  // Método para abrir diálogo de registro
  // En header.component.ts - modifica SOLO el método openRegisterDialog()
  openRegisterDialog() {
    const registerRef = this.dialogService.open(RegisterDialogComponent, {
      closeOnEsc: true,
      autoFocus: true,
      hasBackdrop: true,
    });

    // Actualizar el header cuando se cierra el registro
    registerRef.onClose.subscribe((result: any) => {
      console.log('📨 Resultado del registro:', result);

      if (result?.registered) {
        console.log('✅ Registro exitoso - Abriendo login...');

        // Abrir automáticamente el login después del registro exitoso
        setTimeout(() => {
          this.openLoginDialog();
        }, 500);
      }
    });
  }

  // Método para abrir diálogo de login
  openLoginDialog(): void {
    const loginRef = this.dialogService.open(LoginDialogComponent, {
      closeOnEsc: true,
      autoFocus: true,
      hasBackdrop: true,
    });

    // Actualizar el header cuando se cierra el login
    loginRef.onClose.subscribe((result: any) => {
      if (result) {
        console.log('🔄 Actualizando header después del login...');
        this.checkAuthStatus(); // ← Esto actualizará el header con el nombre del usuario
      }
    });
  }

  // Abrir diálogo de confirmación de logout
  openLogoutDialog(): void {
    const logoutRef = this.dialogService.open(LogoutDialogComponent, {
      closeOnEsc: true,
      autoFocus: true,
      hasBackdrop: true,
    });

    logoutRef.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.performLogout();
      } else {
        console.log('Usuario canceló el cierre de sesión');
      }
    });
  }

  // Realizar el logout
  private performLogout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userid');
    this.currentUser = null;
    this.isLoggedIn = false;
    console.log('Sesión cerrada correctamente');

    // Redirigir al home
    window.location.href = '/';
  }

  goToOrders(): void {
    this.router.navigate(['/my-order']);
  }
}
