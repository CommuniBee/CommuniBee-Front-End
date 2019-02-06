import {ContentModel} from "../../services/communibee-backend/content/content";
import {GenericColumn} from "../../components/generic-table/generic-column";

export enum OfferOrRequest {
  VolunteeringRequest = 'VolunteeringRequest',
  VolunteeringOffer = 'VolunteeringOffer'
}

export const OfferRequestTableColumns: GenericColumn[] = [
  {key: 'title'},
  {key: 'about'},
  {
    key: 'contact',
    cellRenderer: (value: any) => {
      return `איש קשר:${value.name}, ${value.phone}, ${value.email}`;
    }
  },
  {
    key: 'content',
    cellRenderer: (value: ContentModel) => {
      return `תוכן ההתנדבות: ${value.title}`;
    }
  },
  {
    key: 'numberOfVolunteers',
    cellRenderer: (value: number) => {
      return `מספר המתנדבים: ${value}`;
    }
  },
  {
    key: 'kind',
    cellRenderer: (value: string) => {
      return value === OfferOrRequest.VolunteeringRequest ? 'בקשת התנדבות' : 'הצעת התנדבות';
    }
  },
];
