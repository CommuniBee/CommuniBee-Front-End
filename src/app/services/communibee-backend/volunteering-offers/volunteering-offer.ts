import BackendModel from '../backend-model';
import {VolunteeringRequestOfferBase} from '../common-models/volunteering-request-offer-base';

export interface VolunteeringOffer extends VolunteeringRequestOfferBase {
  regions?: [string];
  availableContent?: any;
}

export interface VolunteeringOfferModel extends BackendModel, VolunteeringOffer {
}
