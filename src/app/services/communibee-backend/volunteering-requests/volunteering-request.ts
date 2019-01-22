import BackendModel from '../backend-model';
import {VolunteeringBase} from '../common-models/volunteering-base';

export interface VolunteeringRequest extends VolunteeringBase {
  location: string;
  numberOfOccurrences?: number;
  about: string;
  region: string;
}

export interface VolunteeringRequestModel extends BackendModel, VolunteeringRequest {
}
