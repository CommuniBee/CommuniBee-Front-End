import BackendModel from '../backend-model';
import {VolunteeringRequestModel} from '../volunteering-requests/volunteering-request';
import {VolunteeringOfferModel} from '../volunteering-offers/volunteering-offer';

export interface VolunteeringEvent {
  title: string;
  request: VolunteeringRequestModel;
  offer: VolunteeringOfferModel;
  date: Date;
  createdByUserId: string;
  isDone: boolean;
  requestReview: OrganizationReview;
  offerReview: OrganizationReview;
}

export interface OrganizationReview {
  rating: number;
  description: string;
  createdByUserId:string;
}

export interface VolunteeringEventModel extends BackendModel, VolunteeringEvent {
}
