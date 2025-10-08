import { Component } from '@angular/core';


// se agrega esto de product details
import { OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NbAccordionModule, NbCardModule } from '@nebular/theme';

/*
Se saca este de product details
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

}
*/


// y esto con el import de arriba
@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, NbAccordionModule, NbCardModule], // Módulos necesarios
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {

  product: any; // Variable para guardar los datos del producto

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.product = this.route.snapshot.data['product'];
    console.log('Producto cargado:', this.product);
  }
}