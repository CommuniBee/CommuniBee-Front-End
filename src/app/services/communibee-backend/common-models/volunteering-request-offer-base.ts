import BackendModel from '../backend-model';
import {User} from '../user/user';

export interface VolunteeringRequestOfferBase {
  title: string;
  content: string;
  numberOfVolunteers?: number;
  contact: {
    name: string,
    phone: string,
    email: string,
  };
  availableWeekdays?: number[];
  notes?: [string];
  createdByUserId: string | User;
}

export interface VolunteeringBaseModel extends BackendModel, VolunteeringRequestOfferBase {
}

