import {Injectable} from '@angular/core';
import {CanActivateChild, Router} from '@angular/router';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {tokenNotExpired} from 'angular2-jwt';
import {Auth0Lock} from 'auth0-lock';
import {retry} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {UserProfile} from './user-profile';
import {getCommunibeeApiUrl} from '../../../../configuration';
import {path as subRegionsPath} from '../subregion/subregion.service';
import {SubRegionsModel} from '../subregion/subregion';
import {AppMetadata} from './app-metadata';
import {UserMetadata} from './user-metadata';

@Injectable()
export class AuthService implements CanActivateChild {

  baseLockOptions = {
    theme: {
      logo: '/assets/imgs/bumbleb_logo.png',
      primaryColor: '#FAD11E'
    },
    auth: {
      responseType: 'token id_token',
      audience: `https://${environment.auth0.domain}/userinfo`,
      sso: true,
      params: {
        scope: 'openid email profile app_metadata user_metadata'
      }
    },
    autoclose: true,
    oidcConformant: true,
  };

  signupLockOptions = {
    ...this.baseLockOptions,
    allowLogin: false,
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

  loginLockOptions = {
    ...this.baseLockOptions,
    allowSignUp: false,
    auth: {
      ...this.baseLockOptions.auth,
      redirect: false
    }
  };

  loginLock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    this.loginLockOptions
  );

  signupLock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    this.signupLockOptions
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

      this.signupLockOptions.additionalSignUpFields.push(locationField as any);

      this.signupLock = new Auth0Lock(
        environment.auth0.clientId,
        environment.auth0.domain,
        this.signupLockOptions
      );

      this.loginLock.on('authenticated', (authResult: any) => {
        this.loginLock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            throw new Error(error);
          }

          localStorage.setItem('token', authResult.idToken);
          localStorage.setItem('profile', JSON.stringify(profile));
          this.router.navigate(['/dashboard']);
        });
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

  canActivateChild() {
    const logged: boolean = !!this.isAuthenticated() || !!this.getIdToken();
    if (!logged) {
      this.router.navigate(['/home']);
    }
    return logged;
  }

  public getUserMetadata(): UserMetadata {
    return this.getCustomField('user_metadata');
  }

  public getUserRole(): string {
    return this.getAppMetadata().role;
  }

  public getUserName(): string {
    const userMetadata = this.getUserMetadata();
    return `${userMetadata.first_name} ${userMetadata.last_name}`;
  }

  public getUserEmail(): string {
    return this.getUserProfile().email;
  }

  public getIdToken(): string {
    return localStorage.getItem('token');
  }

  public login(): void {
    this.loginLock.show();
  }

  public signup(): void {
    this.signupLock.show();
  }

  public logout(): void {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    return tokenNotExpired();
  }
}
