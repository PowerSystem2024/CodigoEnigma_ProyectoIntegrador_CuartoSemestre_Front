import { Component } from '@angular/core';

import { OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NbAccordionModule, NbCardModule } from '@nebular/theme';


// y esto con el import de arriba
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, NbAccordionModule, NbCardModule], // Módulos necesarios
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent implements OnInit {

  product: any; // Variable para guardar los datos del producto

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.product = this.route.snapshot.data['product'];
    console.log('Producto cargado:', this.product);
  }
}