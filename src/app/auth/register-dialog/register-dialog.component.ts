import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  NbDialogRef,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbIconModule
 } from '@nebular/theme';
import { AuthService, RegisterResponse } from '../../services/auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule
  ]
})
export class RegisterDialogComponent {
  registerForm: FormGroup;
  loading = false;
  error: string | null = null;

  // AuthService:
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    protected dialogRef: NbDialogRef<RegisterDialogComponent>
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.error = null;

    this.authService.register(this.registerForm.value).pipe(
      catchError(err => {
        this.error = err?.error?.message || 'Error en el registro';
        return of(null);
      }),
      finalize(() => this.loading = false)
    ).subscribe((res: RegisterResponse | null) => {
      if (res) {
        localStorage.setItem('userid', res.token);
        this.dialogRef.close(res);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
