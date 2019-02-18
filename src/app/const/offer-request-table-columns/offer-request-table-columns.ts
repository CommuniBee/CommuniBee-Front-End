import {ContentModel} from '../../services/communibee-backend/content/content';
import {GenericColumn} from '../../components/generic-table/generic-column';

export enum OfferOrRequest {
  VolunteeringRequest = 'VolunteeringRequest',
  VolunteeringOffer = 'VolunteeringOffer'
}

export const offerRequestTableColumns: GenericColumn[] = [
  {
    key: 'title',
    hebKey: 'שם ההתנדבות'
  },
  {
    key: 'about',
    hebKey: 'תיאור'
  },
  {
    key: 'organization',
    hebKey: 'ארגון',
    hideInTable: true
  },
  {
    key: 'contact',
    hebKey: 'איש קשר',
    cellRenderer: (value: any) => {
      return `${value.name}`;
    },
    modalRenderer: (value: any) => {
      return `<span style="white-space: pre">
      שם: ${value.name}
      <br>
      טלפון: ${value.phone}
      <br>
      אימייל: ${value.email}</span>`;
    }
  },
  {
    key: 'content',
    hebKey: 'תוכן ההתנדבות',
    cellRenderer: (value: ContentModel) => {
      return `${value.title}`;
    }
  },
  {
    key: 'numberOfVolunteers',
    hebKey: 'מספר המתנדבים'
  },
  {
    key: 'kind',
    hebKey: 'סוג ההתנדבות',
    cellRenderer: (value: string) => {
      return value === OfferOrRequest.VolunteeringRequest ? 'בקשה' : 'הצעה';
    }
  }
];
