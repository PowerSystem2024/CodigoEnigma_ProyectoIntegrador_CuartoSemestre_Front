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

  // REGISTER - Usa el nombre real del payload
  register(payload: RegisterPayload): Observable<RegisterResponse> {
    console.log('📝 Registrando usuario:', payload);

    return of({
      token: 'fake-jwt-token-' + Date.now(),
      user: {
        id: Math.floor(Math.random() * 1000),
        name: payload.name, // ✅ USA EL NOMBRE REAL DEL FORMULARIO
        email: payload.email
      }
    }).pipe(delay(800));
  }

  // LOGIN CORREGIDO
  login(payload: LoginPayload): Observable<LoginResponse> {
    console.log('📤 Enviando login:', payload);

    // SIMULAR USUARIOS EXISTENTES CON NOMBRES REALES
    const mockUsers = [
      { email: 'lupita@prueba.com', name: 'Lupita González', id: 1 },
      { email: 'juan@prueba.com', name: 'Juan Pérez', id: 2 },
      { email: 'maria@prueba.com', name: 'María Rodríguez', id: 3 }
    ];

    const foundUser = mockUsers.find(user => user.email === payload.email);

    if (foundUser) {
      // USUARIO EXISTENTE - Retorna nombre real
      return of({
        token: `fake-jwt-token-${foundUser.id}`,
        user: {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email
        }
      }).pipe(delay(800));
    } else {
      // NUEVO USUARIO - Usa el email como nombre temporal
      return of({
        token: `fake-jwt-token-new-${Date.now()}`,
        user: {
          id: Math.floor(Math.random() * 1000),
          name: payload.email.split('@')[0],
          email: payload.email
        }
      }).pipe(delay(800));
    }
  }
}
