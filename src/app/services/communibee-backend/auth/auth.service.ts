import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {

  private idToken: string;
  private accessToken: string;
  private expiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: environment.auth0.clientId,
    domain: environment.auth0.domain,
    responseType: 'token id_token',
    redirectUri: environment.auth0.redirectUri,
    scope: 'openid',
  });

  constructor(public router: Router) {
    this.idToken = '';
    this.accessToken = '';
    this.expiresAt = 0;
  }

  get getAccessToken(): string {
    return this.accessToken;
  }

  get getIdToken(): string {
    return this.idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.localLogin(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    this.expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        console.error('Could not renew token, logging out');
        this.logout();
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this.accessToken = '';
    this.idToken = '';
    this.expiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this.expiresAt;
  }

}
