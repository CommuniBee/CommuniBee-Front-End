import BackendModel from '../backend-model';
import { Regions, RegionsModel } from '../region/region';


export interface SubRegions extends Regions {
  region: RegionsModel;
}

export interface SubRegionsModel extends BackendModel, SubRegions {
}
