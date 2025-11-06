import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NbButtonModule } from '@nebular/theme';

/**
 * Hero component - Componente de banner principal para la landing page
 * Sigue las mejores prácticas de Angular standalone components
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, NbButtonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  /**
   * Título principal del hero
   */
  @Input() title!: string;

  /**
   * Subtítulo o descripción
   */
  @Input() subtitle!: string;

  /**
   * Texto del botón principal
   */
  @Input() buttonText!: string;

  /**
   * Ruta de navegación al hacer clic en el botón
   */
  @Input() buttonRoute!: string;

  /**
   * URL de la imagen de fondo
   */
  @Input() backgroundImage!: string;

  /**
   * Altura del hero (en vh)
   */
  @Input() height!: number;

  constructor(private router: Router) {}

  /**
   * Navega a la ruta especificada
   */
  onButtonClick(): void {
    if (this.buttonRoute) {
      this.router.navigate([this.buttonRoute]);
    }
  }
}
