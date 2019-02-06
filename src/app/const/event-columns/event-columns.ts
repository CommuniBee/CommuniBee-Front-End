import {GenericColumn} from '../../components/generic-table/generic-column';
import * as moment from 'moment';

export const eventColumns: GenericColumn[] = [
  {
    key: 'request',
    hebKey: 'שם ההתנדבות',
    cellRenderer: (req: any) => req.title
  },
  {
    key: 'request',
    hebKey: 'ארגון',
    cellRenderer: (req: any) => req.organization
  },
  {
    key: 'offer',
    hebKey: 'מבצע',
    cellRenderer: (off: any) => off.organization
  },
  {
    key: 'request',
    hebKey: 'נציג ארגון',
    cellRenderer: (req: any) => req.contact.name
  },
  {
    key: 'offer',
    hebKey: 'נציג מתנדב',
    cellRenderer: (off: any) => off.contact.name
  },
  {
    key: 'date',
    hebKey: 'תאריך',
    cellRenderer: (date: string) => moment(date).format('DD-MM-YYYY HH:mm')
  }
];
