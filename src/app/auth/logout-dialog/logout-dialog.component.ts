import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbDialogRef,
  NbCardModule,
  NbButtonModule,
  NbIconModule
} from '@nebular/theme';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule
  ]
})
export class LogoutDialogComponent {

  constructor(
    protected dialogRef: NbDialogRef<LogoutDialogComponent>
  ) {}

  confirmLogout(): void {
    this.dialogRef.close(true); // true = usuario confirmó logout
  }

  cancelLogout(): void {
    this.dialogRef.close(false); // false = usuario canceló
  }
}
