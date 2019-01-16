import BackendModel from '../backend-model';

export interface User {
  _id?: string;
  name?: string;
  email?: string;
  sub_id?: string;
}

export interface UserModel extends BackendModel, User {
}
