import BackendModel from '../backend-model';
import {VolunteeringBase} from '../common-models/volunteering-base';

export interface VolunteeringOffer extends VolunteeringBase {
  regions?: [string];
  availableContent?: any;
}

export interface VolunteeringOfferModel extends BackendModel, VolunteeringOffer {
}
