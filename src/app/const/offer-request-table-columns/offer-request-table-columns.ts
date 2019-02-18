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
    hebKey: 'תיאור'
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
    },
    isTableColumn: true
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
    },
    isTableColumn: true
  },
  {
    key: 'multiOccurrence',
    hebKey: 'רב פעמי',
    modalRenderer: (value: boolean) => {
      return ` <i class="far ${value ? 'fa-check-square' : 'fa-square'}"></i>`;
    }
  },
  {
    key: 'regions',
    hebKey: 'איזורים',
    modalRenderer: (value: { name: string, region: string }[]) => {
      let regionsHTML: string = '  ';

      for (const region of value) {
        regionsHTML += `<span class="badge badge-success ml-1 mb-1">${region.name}</span>`;
      }
      return regionsHTML;
    }
  }
];
