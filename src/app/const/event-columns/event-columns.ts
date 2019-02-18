import {GenericColumn} from '../../components/generic-table/generic-column';
import * as moment from 'moment';

export const eventColumns: GenericColumn[] = [
  {
    key: 'request',
    hebKey: 'שם ההתנדבות',
    isTableColumn: true,
    cellRenderer: (req: any) => req.title
  },
  {
    key: 'request',
    hebKey: 'ארגון',
    isTableColumn: true,
    cellRenderer: (req: any) => req.organization
  },
  {
    key: 'offer',
    hebKey: 'תוכן',
    cellRenderer: (off: any) => off.content.title
  },
  {
    key: 'offer',
    hebKey: 'מבצע',
    isTableColumn: true,
    cellRenderer: (off: any) => off.organization
  },
  {
    key: 'request',
    hebKey: 'נציג ארגון',
    isTableColumn: true,
    cellRenderer: (req: any) => req.contact.name
  },
  {
    key: 'offer',
    hebKey: 'נציג מתנדב',
    isTableColumn: true,
    cellRenderer: (off: any) => off.contact.name
  },
  {
    key: 'date',
    hebKey: 'תאריך',
    isTableColumn: true,
    cellRenderer: (date: string) => moment(date).format('DD-MM-YYYY HH:mm')
  }
];
