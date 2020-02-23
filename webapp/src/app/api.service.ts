import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {}

  private call<T>(method: string, path: string, body?: any): Observable<T> {
    return this.httpClient.request(
      method,
      new URL(path, environment.apiUrl).toString(),
      {
        headers: new HttpHeaders({
          ...(this.authService.token && {
            Authorization: `Bearer ${this.authService.token}`,
          }),
        }),
        responseType: 'json',
        ...(body && { body }),
      },
    ) as Observable<T>;
  }

  auth(code: string): Observable<AuthResponse> {
    return this.call('POST', '/auth/login', { code });
  }

  playlists() {
    return this.call('GET', '/spotify/playlists');
  }

  playback() {
    return this.call('GET', '/spotify/playback');
  }
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}
