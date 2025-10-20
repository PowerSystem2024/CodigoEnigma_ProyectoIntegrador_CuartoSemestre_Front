import { NbMenuService, NbSearchService, NbDialogService, NbDialogRef, NbPopoverModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { NebularModule } from '../../shared/nebular-module';
import { RegisterDialogComponent } from '../../auth/register-dialog/register-dialog.component';
import { LoginDialogComponent } from '../../auth/login-dialog/login-dialog.component';
import { LogoutDialogComponent } from '../../auth/logout-dialog/logout-dialog.component';

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

  constructor(
    private dialogService: NbDialogService,
    private menuService: NbMenuService,
    private searchService: NbSearchService
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
    this.setupAuthListener();

    // Escuchar cambios en el localStorage entre pestañas
    window.addEventListener('storage', (event) => {
      if (event.key === 'currentUser') {
        this.checkAuthStatus();
      }
    });
  }

  // Verificar si hay usuario logueado
  private checkAuthStatus(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.isLoggedIn = true;
    } else {
      this.currentUser = null;
      this.isLoggedIn = false;
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
  openRegisterDialog() {
    this.dialogService.open(RegisterDialogComponent, {
      closeOnEsc: true,
      autoFocus: true,
      hasBackdrop: true,
    });
  }

  // Método para abrir diálogo de login
  openLoginDialog(): void {
    this.dialogService.open(LoginDialogComponent, {
      closeOnEsc: true,
      autoFocus: true,
      hasBackdrop: true,
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

  // Métodos para el menú personalizado
  openProfile(): void {
    console.log('Abrir perfil');
    // Redirigir o abrir diálogo de perfil
    window.location.href = '/profile';
  }

  openOrders(): void {
    console.log('Abrir pedidos');
    window.location.href = '/orders';
  }

  openSettings(): void {
    console.log('Abrir ajustes');
    window.location.href = '/settings';
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
}
