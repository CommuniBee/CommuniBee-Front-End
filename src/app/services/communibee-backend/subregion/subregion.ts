import BackendModel from '../backend-model';
import { Regions, RegionsModel } from '../region/region';

export interface SubRegions {
  name: string;
  region: RegionsModel;
}

export interface SubRegionsModel extends BackendModel, SubRegions {
}
