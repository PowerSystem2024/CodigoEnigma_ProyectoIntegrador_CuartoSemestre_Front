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
import { AuthService } from '../../services/auth.service'; //
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, //
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    protected dialogRef: NbDialogRef<RegisterDialogComponent>
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit(): void {
    this.markFormGroupTouched();

    if (this.registerForm.invalid) {
      this.error = 'Por favor completa todos los campos correctamente';
      return;
    }

    this.loading = true;
    this.error = null;

    const { confirmPassword, ...registerData } = this.registerForm.value;

    console.log('📝 Enviando registro:', registerData);

    // AUTH SERVICE
    this.authService.register(registerData).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log('✅ Respuesta del registro:', res);

        this.toastrService.success(
          'Registro exitoso',
          `¡Cuenta creada para ${res.user.name}! Ahora puedes iniciar sesión.`
        );

        // CERRAR sin hacer login automático
        this.dialogRef.close({
          registered: true
        });
      },
      error: (err) => {
        this.loading = false;
        console.error('❌ Error en registro:', err);
        this.error = err?.error?.message || 'Error en el registro. Intenta nuevamente.';
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  openLogin(): void {
    this.dialogRef.close();
    this.dialogService.open(LoginDialogComponent, {
      closeOnEsc: true,
      autoFocus: true,
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }

    return null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key)?.markAsTouched();
    });
  }

  // Getters para facilitar el acceso en el template
  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
