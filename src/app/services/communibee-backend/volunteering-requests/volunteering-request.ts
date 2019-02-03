import BackendModel from '../backend-model';
import {VolunteeringRequestOfferBase} from '../common-models/volunteering-request-offer-base';

// tslint:disable-next-line:no-empty-interface
export interface VolunteeringRequest extends VolunteeringRequestOfferBase {
    about: string;
}

export interface VolunteeringRequestModel extends BackendModel, VolunteeringRequest {
}
