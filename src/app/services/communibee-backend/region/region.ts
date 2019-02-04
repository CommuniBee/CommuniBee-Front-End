import BackendModel from '../backend-model';

export interface Regions {
  name: string;
}

export interface RegionsModel extends BackendModel, Regions {
}
