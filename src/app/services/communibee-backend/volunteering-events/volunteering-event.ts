import BackendModel from '../backend-model';

export interface VolunteeringRequestOfferBase {
  numberOfVolunteers: number;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  dateRange: {
    from: Date;
    to: Date;
  };
  availableWeekdays: number[];
  timeRange: {
    from: Date;
    to: Date;
  };
  notes: string[];
  createdByUserId: string;
}

export interface VolunteeringEvent {
  request: VolunteeringRequestOfferBase;
  offer: VolunteeringRequestOfferBase;
  date: Date;
  createdByUserId: string;
}

export interface VolunteeringEventModel extends BackendModel, VolunteeringEvent {
}
