import {ContentModel} from '../../services/communibee-backend/content/content';
import {GenericColumn} from '../../components/generic-table/generic-column';

export enum OfferOrRequest {
  VolunteeringRequest = 'VolunteeringRequest',
  VolunteeringOffer = 'VolunteeringOffer'
}

export const offerRequestTableColumns: GenericColumn[] = [
  {
    key: 'title',
    hebKey: 'שם ההתנדבות',
    isTableColumn: true
  },
  {
    key: 'about',
    hebKey: 'תיאור',
    isTableColumn: true
  },
  {
    key: 'organization',
    hebKey: 'ארגון'
  },
  {
    key: 'contact',
    hebKey: 'איש קשר',
    cellRenderer: (value: any) => {
      return `${value.name}`;
    },
    modalRenderer: (value: any) => {
      return `<span style="white-space: pre-line">
      שם: ${value.name}
      <br>
      טלפון: ${value.phone}
      <br>
      אימייל: ${value.email}</span>`
    },
    isTableColumn: true
  },
  {
    key: 'content',
    hebKey: 'תוכן ההתנדבות',
    cellRenderer: (value: ContentModel) => {
      return `${value.title}`;
    },
    isTableColumn: true
  },
  {
    key: 'numberOfVolunteers',
    hebKey: 'מספר המתנדבים',
    isTableColumn: true
  },
  {
    key: 'kind',
    hebKey: 'סוג ההתנדבות',
    cellRenderer: (value: string) => {
      return value === OfferOrRequest.VolunteeringRequest ? 'בקשה' : 'הצעה';
    },
    isTableColumn:true
  }
];
