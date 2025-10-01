import { NbMenuService, NbSearchService, NbDialogService, NbDialogRef} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core'; //Se agrega importación de Input
import { CartComponent } from '../cart/cart.component';
import { NebularModule } from '../../shared/nebular-module';
// Enlaza al componente de registro
import { RegisterDialogComponent } from '../../auth/register-dialog/register-dialog.component';

@Component({
    selector: 'app-header',
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
  constructor(private dialogService: NbDialogService) {}

  // Nuevo método para abrir el diálogo
  openRegisterDialog() {
    // Llama al servicio, pasándole el componente a abrir
    this.dialogService.open(RegisterDialogComponent, {
      context: {

      },
      closeOnEsc: true, // Buenas prácticas: permitir cerrar con Esc
      autoFocus: true, // Buenas prácticas: enfocar el primer campo
    });
  }


  userMenu = [
    { title: 'Perfil', icon: 'person-outline' },
    { title: 'Ajustes', icon: 'settings-2-outline' },
    { title: 'Salir', icon: 'unlock-outline' },
  ];
}

