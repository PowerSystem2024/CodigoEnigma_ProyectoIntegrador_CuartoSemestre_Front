import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from '../models/auth.model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}api/auth/`;

  constructor(private http: HttpClient) {}

  // REGISTER - Conecta al endpoint real
  register(payload: RegisterPayload): Observable<RegisterResponse> {
    console.log('📝 Registrando usuario:', payload);
    return this.http.post<RegisterResponse>(`${this.apiUrl}register`, payload);
  }

  // LOGIN - Conecta al endpoint real
  login(payload: LoginPayload): Observable<LoginResponse> {
    console.log('📤 Enviando login:', payload);
    return this.http.post<LoginResponse>(`${this.apiUrl}login`, payload).pipe(
      map((response: any) => {
        // Mapear la respuesta del backend al formato esperado por el frontend
        return {
          token: response.access_token,
          user: {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email
          }
        };
      })
    );
  }
}
