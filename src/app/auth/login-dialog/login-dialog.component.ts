import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  NbDialogRef,
  NbDialogService,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbIconModule,
  NbToastrService
} from '@nebular/theme';
import { AuthService } from '../../services/auth.service';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { catchError, finalize, of } from 'rxjs';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
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

export class LoginDialogComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    protected dialogRef: NbDialogRef<LoginDialogComponent>
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

onSubmit(): void {
  this.markFormGroupTouched();

  if (this.loginForm.invalid) {
    this.error = 'Por favor completa todos los campos correctamente';
    return;
  }

  this.loading = true;
  this.error = null;

  // Uso del AuthService
  this.authService
    .login(this.loginForm.value)
    .pipe(
    catchError(err => {
      console.error('Error en login:', err);
      this.error = err?.error?.message || 'Credenciales incorrectas. Intenta nuevamente.';
      return of(null);
    }),
    finalize(() => this.loading = false)
  ).subscribe((res: LoginResponse | null) => {
    if (res) {
      localStorage.setItem('userid', res.token);
      this.toastrService.success('Login exitoso', '¡Bienvenido de nuevo!');
      this.dialogRef.close(res);
    }
  });
}

  onCancel(): void {
    this.dialogRef.close();
  }

  openRegister(): void {
    this.dialogRef.close();
    this.dialogService.open(RegisterDialogComponent, {
      closeOnEsc: true,
      autoFocus: true,
    });
  }

  openForgotPassword(): void {
    // Implementar diálogo de recuperación de contraseña
    this.toastrService.warning('Recuperación de contraseña en desarrollo', 'Esta funcionalidad estará disponible pronto');
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  // Getters para facilitar el acceso en el template
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
