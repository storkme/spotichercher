import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import * as jwt_decode from 'jwt-decode';

const TOKEN = 'token';
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // tslint:disable-next-line:variable-name
  private _token: string;

  constructor() {
    this.onInit();
  }

  get token() {
    return this._token;
  }

  setToken(token: string, refreshToken: string) {
    this._token = token;
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  /**
   * Return the 'redirect' URL. This is the url in the backend which will redirect
   * to the spotify login page.
   */
  get redirectUrl() {
    return new URL('/auth/redirect', environment.apiUrl).toString();
  }

  private onInit() {
    this._token = localStorage.getItem(TOKEN);
  }
}
