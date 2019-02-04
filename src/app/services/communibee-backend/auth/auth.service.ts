import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Auth0Lock } from 'auth0-lock';
import { environment } from '../../../../environments/environment';
import {UserProfile} from './user-profile';

@Injectable()
export class AuthService {

  auth0Options = {
    theme: {
      logo: '/assets/imgs/bumbleb_logo.png',
      primaryColor: '#FAD11E'
    },
    auth: {
      redirectUrl: environment.auth0.redirectUri,
      responseType: 'token id_token',
      audience: `https://${environment.auth0.domain}/userinfo`,
      params: {
        scope: 'openid email profile'
      }
    },
    autoclose: true,
    oidcConformant: true,
    additionalSignUpFields: [
      {
        name: 'organization',
        placeholder: 'your organization',
      }, {
        name: 'first_name',
        placeholder: 'your first name'
      }, {
        name: 'last_name',
        placeholder: 'your last name'
      }, {
        type: 'select',
        name: 'location',
        placeholder: 'your location',
        options: [
          {value: 'us', label: 'United States'},
          {value: 'fr', label: 'France'},
          {value: 'ar', label: 'Argentina'}
        ],
        // prefill: 'us'
      }
    ],
  };

  lock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    this.auth0Options
  );

  constructor(private router: Router) {
    this.lock.on('authenticated', (authResult: any) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          throw new Error(error);
        }

        localStorage.setItem('token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.router.navigate(['/']);
      });
    });

    this.lock.on('authorization_error', error => {
      console.error('something went wrong', error);
    });

  }

  public getUserProfile(): UserProfile {
    return JSON.parse(localStorage.getItem('profile'));
  }

  public getUserId(): string {
    return this.getUserProfile().sub;
  }

  public getUserName(): string {
    return this.getUserProfile().name;
  }

  public getIdToken(): string {
    return localStorage.getItem('token');
  }

  public login(): void {
    this.lock.show();
  }

  public logout(): void {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');

    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return tokenNotExpired();
  }
}
