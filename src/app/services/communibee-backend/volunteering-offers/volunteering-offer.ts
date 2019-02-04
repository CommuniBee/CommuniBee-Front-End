import BackendModel from '../backend-model';
import {VolunteeringRequestOfferBase} from '../common-models/volunteering-request-offer-base';

export interface VolunteeringOffer extends VolunteeringRequestOfferBase {
  numberOfVolunteers: number;
}

export interface VolunteeringOfferModel extends BackendModel, VolunteeringOffer {
}
