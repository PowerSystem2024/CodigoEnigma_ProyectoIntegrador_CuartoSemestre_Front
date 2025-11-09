import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NbButtonModule } from '@nebular/theme';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, NbButtonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

  @Input() title!: string;


  @Input() subtitle!: string;


  @Input() buttonText!: string;


  @Input() buttonRoute!: '/products';


  @Input() backgroundImage!: string;

  @Input() height!: number;

  constructor(private router: Router) {}

  onButtonClick(): void {
    this.router.navigate([this.buttonRoute || '/products']);
  }
}
