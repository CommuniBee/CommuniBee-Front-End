import {ContentModel} from "../../services/communibee-backend/content/content";
import {GenericColumn} from "../../components/generic-table/generic-column";

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
      return value === 'VolunteeringRequest' ? 'בקשת התנדבות' : 'הצעת התנדבות';
    }
  },
];
