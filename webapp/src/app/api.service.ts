import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {}

  private call(method: string, path: string, body?: any) {
    return this.httpClient.request(
      method,
      new URL(path, environment.apiUrl).toString(),
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authService.token}`,
        }),
        ...(body && { body }),
      },
    );
  }

  auth(code: string) {
    return this.call('POST', '/auth/login', { code });
  }
}
