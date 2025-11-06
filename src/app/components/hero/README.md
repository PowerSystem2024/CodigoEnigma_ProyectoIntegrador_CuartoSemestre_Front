# Hero Component

Componente hero moderno y reutilizable para Angular siguiendo las mejores prácticas.

## Características

- ✅ **Standalone Component**: No requiere módulos adicionales
- ✅ **Totalmente Configurable**: Props para personalizar todos los aspectos
- ✅ **Responsive**: Adaptado para todos los dispositivos
- ✅ **Accesible**: Cumple con estándares WCAG
- ✅ **Performance**: Optimizado con OnPush strategy
- ✅ **Animaciones**: Transiciones suaves y profesionales
- ✅ **Efecto Parallax**: Experiencia visual mejorada

## Uso

### Importación

```typescript
import { HeroComponent } from './components/hero/hero.component';

@Component({
  // ...
  imports: [HeroComponent]
})
```

### Ejemplo Básico

```html
<app-hero></app-hero>
```

### Ejemplo Personalizado

```html
<app-hero
  [title]="'Descubre la Naturaleza'"
  [subtitle]="'Productos naturales y sostenibles para tu bienestar'"
  [buttonText]="'Explorar Productos'"
  [buttonRoute]="'/productos'"
  [backgroundImage]="'assets/images/hero-background.jpg'"
  [height]="60">
</app-hero>
```

## Props (Inputs)

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | `'Descubre la Naturaleza'` | Título principal del hero |
| `subtitle` | `string` | `'Productos naturales...'` | Subtítulo o descripción |
| `buttonText` | `string` | `'Ver Productos'` | Texto del botón CTA |
| `buttonRoute` | `string` | `'/'` | Ruta de navegación |
| `backgroundImage` | `string` | `'assets/images/hero-background.jpg'` | URL de la imagen |
| `height` | `number` | `60` | Altura en viewport height (vh) |

## Instalación de la Imagen

1. Guarda la imagen proporcionada como `hero-background.jpg`
2. Colócala en `src/assets/images/`

## Personalización de Estilos

Las variables CSS pueden modificarse en `src/styles.scss`:

```scss
:root {
  --primary-color: #256144;
  --terciary-color: #eec8b0;
}
```

## Buenas Prácticas Implementadas

1. **Standalone Components**: Componente independiente sin módulos
2. **Input Properties**: Configuración flexible via props
3. **Type Safety**: Tipado estricto de TypeScript
4. **Responsive Design**: Mobile-first approach
5. **Accessibility**: ARIA labels y soporte de teclado
6. **Performance**: Animaciones optimizadas con transform
7. **SEO Friendly**: Estructura semántica HTML5
8. **Documentación**: JSDoc completo en el código
9. **CSS Custom Properties**: Variables para fácil theming
10. **Media Queries**: Adaptación a prefers-reduced-motion

## Accesibilidad

- ✅ Etiquetas ARIA adecuadas
- ✅ Soporte completo de navegación por teclado
- ✅ Alto contraste para legibilidad
- ✅ Respeta preferencias de movimiento reducido
- ✅ Textos con sombras para mejor legibilidad

## Navegadores Soportados

- Chrome/Edge (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Mobile browsers (iOS Safari, Chrome Mobile)
