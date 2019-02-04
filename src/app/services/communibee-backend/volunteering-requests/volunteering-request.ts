import BackendModel from '../backend-model';
import {VolunteeringRequestOfferBase} from '../common-models/volunteering-request-offer-base';

export interface VolunteeringRequest extends VolunteeringRequestOfferBase {
    about: string;
}

export interface VolunteeringRequestModel extends BackendModel, VolunteeringRequest {
}
