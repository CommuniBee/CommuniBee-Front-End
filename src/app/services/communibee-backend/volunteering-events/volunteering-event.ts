import BackendModel from '../backend-model';

export interface VoulunteeringEventModel extends BackendModel, VoulunteeringEvent {
}

export interface VoulunteeringEvent {
  request: VolunteeringRequestOfferBase;
  offer: VolunteeringRequestOfferBase;
  date: Date;
  userInitiated: {
    name: string;
    reloe: string[];
  };
}

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
}
