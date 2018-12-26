import BackendModel from '../backend-model';

export interface VolunteeringOffer {
  location: string;
}

export interface VolunteeringOfferModel extends BackendModel, VolunteeringOffer {
}
