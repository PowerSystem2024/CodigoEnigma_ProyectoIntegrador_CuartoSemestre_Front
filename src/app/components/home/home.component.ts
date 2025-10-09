import { Component } from '@angular/core';
import { NoticiasComponent } from '../noticias/noticias.component';

//

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NoticiasComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
