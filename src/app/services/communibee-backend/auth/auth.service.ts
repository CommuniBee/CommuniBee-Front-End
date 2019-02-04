import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Auth0Lock } from 'auth0-lock';
import { retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { UserProfile } from './user-profile';
import { getCommunibeeApiUrl } from '../../../../configuration';
import { path as subRegionsPath } from '../subregion/subregion.service';
import { SubRegionsModel } from '../subregion/subregion';
import { AppMetadata } from './app-metadata';
import { UserMetadata } from './user-metadata';

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
        scope: 'openid email profile app_metadata user_metadata'
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
      },
    ],
  };
  lock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    this.auth0Options
  );

  constructor(private router: Router, httpBackend: HttpBackend) {

    const httpClient = new HttpClient(httpBackend);

    httpClient.get<SubRegionsModel[]>(`${getCommunibeeApiUrl()}/${subRegionsPath}`).pipe(
      retry(3),
    ).subscribe((subRegionsResponse: SubRegionsModel[]) => {

      const subRegionsOptions = subRegionsResponse.map(subRegion => ({
        'value': subRegion._id,
        'label': subRegion.name
      }));

      const locationField = {
        type: 'select',
        name: 'location',
        placeholder: 'your location',
        options: subRegionsOptions,
        prefill: subRegionsOptions[0].value
      };

      this.auth0Options.additionalSignUpFields.push(locationField as any);

      this.lock = new Auth0Lock(
        environment.auth0.clientId,
        environment.auth0.domain,
        this.auth0Options
      );

      this.lock.on('authenticated', (authResult: any) => {
        console.log(this.lock);
        this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
          console.log(profile);
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

    });
  }

  public getUserProfile(): UserProfile {
    return JSON.parse(localStorage.getItem('profile'));
  }

  public getUserId(): string {
    return this.getUserProfile().sub;
  }

  private getCustomField(key: string): any {
    const fullKey = `https://${environment.auth0.domain.replace(/\./g, ':')}/${key}`;
    return this.getUserProfile()[fullKey];
  }

  private getAppMetadata(): AppMetadata {
    return this.getCustomField('app_metadata');
  }

  public getUserMetadata(): UserMetadata {
    return this.getCustomField('user_metadata');
  }

  public getRole(): string {
    return this.getAppMetadata().role;
  }
  public getUserName(): string {
    const userMetadata = this.getUserMetadata();
    return `${userMetadata.first_name} ${userMetadata.last_name}`;
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
