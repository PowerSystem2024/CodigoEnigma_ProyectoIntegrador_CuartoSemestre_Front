import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NebularModule } from './nebular-module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, NebularModule],
  template: `
    <nb-card>
      <nb-card-header>{{ title }}</nb-card-header>
      <nb-card-body>
        {{ message }}
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="danger" (click)="confirm()">{{ confirmText }}</button>
        <button nbButton status="basic" (click)="cancel()" style="margin-left: 10px;">{{ cancelText }}</button>
      </nb-card-footer>
    </nb-card>
  `
})
export class ConfirmationDialogComponent {
  @Input() title: string = 'Confirmar';
  @Input() message: string = '¿Está seguro?';
  @Input() confirmText: string = 'Confirmar';
  @Input() cancelText: string = 'Cancelar';

  constructor(protected ref: NbDialogRef<ConfirmationDialogComponent>) {}

  confirm() {
    this.ref.close(true);
  }

  cancel() {
    this.ref.close(false);
  }
}
