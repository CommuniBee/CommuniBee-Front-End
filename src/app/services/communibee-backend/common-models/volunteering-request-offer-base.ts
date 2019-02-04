import BackendModel from '../backend-model';
import {User} from '../user/user';
import { Content, ContentModel } from '../content/content';

export interface VolunteeringRequestOfferBase {
  organization: string;
  content: Content | ContentModel;
  contact: {
    name: string,
    phone: string,
    email: string,
  };
  multiOccurrence: boolean;
  regions: [string];
  createdByUserId: string | User;
}

export interface VolunteeringBaseModel extends BackendModel, VolunteeringRequestOfferBase {
}

