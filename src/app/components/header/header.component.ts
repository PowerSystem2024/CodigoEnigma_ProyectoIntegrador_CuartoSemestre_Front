import { NbMenuService, NbSearchService, NbDialogService, NbDialogRef} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core'; //Se agrega importación de Input
import { CartComponent } from '../cart/cart.component';
import { NebularModule } from '../../shared/nebular-module';
import { RegisterDialogComponent } from '../../auth/register-dialog/register-dialog.component'; // Enlaza al componente de registro
import { LoginDialogComponent } from '../../auth/login-dialog/login-dialog.component';// Enlaza al componente de login

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [
      CommonModule,
      CartComponent,
      NebularModule,
    ]
})

export class HeaderComponent {
  // Inyecta el servicio en el constructor
  constructor(
    private dialogService: NbDialogService,
    private menuService: NbMenuService,
    private searchService: NbSearchService
  ) {}

  // Nuevo método para abrir el diálogo
  openRegisterDialog() {
    // Llama al servicio, pasándole el componente a abrir
    this.dialogService.open(RegisterDialogComponent, {
      closeOnEsc: true, // Buenas prácticas: permitir cerrar con Esc
      autoFocus: true, // Buenas prácticas: enfocar el primer campo
      hasBackdrop: true,  // Buenas prácticas: mostrar un fondo opaco
    });
  }

  userMenu = [
    { title: 'Perfil', icon: 'person-outline' },
    { title: 'Ajustes', icon: 'settings-2-outline' },
    { title: 'Salir', icon: 'unlock-outline' },
  ];


// Dialogo de login
openLoginDialog(): void {
  this.dialogService.open(LoginDialogComponent, {
    closeOnEsc: true,
    autoFocus: true,
    hasBackdrop: true,
    });
  }
}
