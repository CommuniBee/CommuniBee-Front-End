import BackendModel from '../backend-model';

export interface VolunteeringRequest {
  location: string;
  numberOfOccurrences: number;
}

export interface VolunteeringRequestModel extends BackendModel, VolunteeringRequest {
}
