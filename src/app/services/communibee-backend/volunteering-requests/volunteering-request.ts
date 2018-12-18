import BackendModel from '../backend-model';

export interface VolunteeringRequestModel extends BackendModel, VolunteeringRequest {
}

export interface VolunteeringRequest {
  location: string;
  numberOfOccurrences: number;
}
