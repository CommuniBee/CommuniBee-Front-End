import BackendModel from '../backend-model';
import {VolunteeringRequestOfferBase} from '../common-models/volunteering-request-offer-base';

export interface VolunteeringRequest extends VolunteeringRequestOfferBase {
  location: string;
  numberOfOccurrences?: number;
  about: string;
  region: string;
}

export interface VolunteeringRequestModel extends BackendModel, VolunteeringRequest {
}
