import BackendModel from '../backend-model';

export interface VolunteeringOfferModel extends BackendModel, VolunteeringOffer {
}

export interface VolunteeringOffer {
  location: string;
}
