import { NbMenuService, NbSearchService} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { NebularModule } from '../../shared/nebular-module';

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
  user = {
    name: 'Pepe Argento',
    picture: 'assets/avatar.png',
  };
  
  userMenu = [
    { title: 'Perfil', icon: 'person-outline' },
    { title: 'Ajustes', icon: 'settings-2-outline' },
    { title: 'Salir', icon: 'unlock-outline' },
  ];

  constructor(private menuService: NbMenuService, private searchService: NbSearchService) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      console.log(data);
    })
  }
}