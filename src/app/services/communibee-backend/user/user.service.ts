import { Injectable } from '@angular/core';
import {BackendModelService} from '../basic-model.service';
import {User, UserModel} from './user';
import {BackendHttpService} from '../backend-http.service';
import {ErrorHandlerService} from '../../error-handler/error-handler.service';

const path = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BackendModelService<User, UserModel> {

  constructor(private backendHttpService: BackendHttpService) {
    super(path, backendHttpService);
  }

  async getLoggedUser(): Promise<User> {
    try {
      return await this.backendHttp.get(`${this.path}/subscriber/me`);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

}
