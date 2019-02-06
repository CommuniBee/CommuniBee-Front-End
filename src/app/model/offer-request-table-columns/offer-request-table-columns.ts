import {ContentModel} from "../../services/communibee-backend/content/content";
import {GenericColumn} from "../../components/generic-table/generic-column";

export enum OfferOrRequest {
  VolunteeringRequest = 'VolunteeringRequest',
  VolunteeringOffer = 'VolunteeringOffer'
}

export const OfferRequestTableColumns: GenericColumn[] = [
  {key: 'title', hebKey:'שם ההתנדבות'},
  {key: 'about', hebKey:'תיאור'},
  {
    key: 'contact',
    hebKey:'איש קשר',
    cellRenderer: (value: any) => {
      return `${value.name}`;
    }
  },
  {
    key: 'content',
    hebKey:'תוכן ההתנדבות',
    cellRenderer: (value: ContentModel) => {
      return `${value.title}`;
    }
  },
  {
    key: 'numberOfVolunteers',
    hebKey:'מספר המתנדבים',
    cellRenderer: (value: number) => {
      return `${value}`;
    }
  },
  {
    key: 'kind',
    hebKey:'סוג ההתנדבות',
    cellRenderer: (value: string) => {
      return value === OfferOrRequest.VolunteeringRequest ? 'בקשה' : 'הצעה';
    }
  },
];
