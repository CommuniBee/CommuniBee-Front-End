import {GenericColumn} from '../../components/generic-table/generic-column';
import * as moment from 'moment';

export const eventColumns: GenericColumn[] = [
  {
    key: 'title',
    hebKey: 'שם ההתנדבות',
    isTableColumn: true,
    cellRenderer: (title: any) => title
  },
  {
    key: 'offer',
    hebKey: 'תוכן',
    cellRenderer: (off: any) => off.content.title
  },
  {
    key: 'request',
    hebKey: 'ארגון מארח',
    isTableColumn: true,
    cellRenderer: (req: any) => req.organization
  },
  {
    key: 'request',
    hebKey: 'נציג מארח',
    cellRenderer: (req: any) => req.contact.name
  },
  {
    key: 'offer',
    hebKey: 'ארגון מתנדב',
    isTableColumn: true,
    cellRenderer: (off: any) => off.organization
  },
  {
    key: 'offer',
    hebKey: 'נציג מתנדב',
    cellRenderer: (off: any) => off.contact.name
  },
  {
    key: 'date',
    hebKey: 'תאריך',
    isTableColumn: true,
    cellRenderer: (date: string) => moment(date).format('DD-MM-YYYY')
  }
];
