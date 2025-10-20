import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}

  // ✅ VERSIÓN MOCK PARA TESTING - REGISTER
  register(payload: RegisterPayload): Observable<RegisterResponse> {
    // Simula éxito
    return of({
      token: 'fake-jwt-token-' + Date.now(),
      user: {
        id: Math.floor(Math.random() * 1000), // ID aleatorio
        name: payload.name,
        email: payload.email
      }
    }).pipe(delay(800));

    // Para simular error (descomenta para probar):
    /*
    return of({
      token: '',
      user: {
        id: 0,
        name: '',
        email: ''
      }
    }).pipe(
      delay(800),
      // Simular error
      map(() => {
        throw {
          error: {
            message: 'El usuario ya existe'
          }
        };
      })
    );
    */
  }

  // ✅ VERSIÓN MOCK PARA TESTING - LOGIN
  login(payload: LoginPayload): Observable<LoginResponse> {
    console.log('📤 Enviando login:', payload);

    // Mock simple - igual que el registro
    return of({
      token: `fake-jwt-token-login-${Date.now()}`,
      user: {
        id: Math.floor(Math.random() * 1000),
        name: 'Usuario Logeado',
        email: payload.email
      }
    }).pipe(delay(1000));

    // Para backend real (futuro):
    // return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, payload);
  }

  // ✅ VERSIÓN REAL (cuando tengas backend)
  /*
  register(userData: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, userData);
  }

  login(userData: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, userData);
  }
  */
}
