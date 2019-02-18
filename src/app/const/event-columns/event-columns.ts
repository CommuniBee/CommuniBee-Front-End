import {GenericColumn} from '../../components/generic-table/generic-column';
import * as moment from 'moment';
import {OrganizationReview} from '../../services/communibee-backend/volunteering-events/volunteering-event';

export const baseEventColumns: GenericColumn[] = [
  {
    key: 'title',
    hebKey: 'שם ההתנדבות',
    isTableColumn: true,
    isTitleColumn: () => true,
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
    isTableColumn: true,
    cellRenderer: (off: any) => off.contact.name
  },
  {
    key: 'offerReview',
    hebKey: 'הערת מתנדב',
    cellRenderer: (review: OrganizationReview) => review.description
  },
  {
    key: 'offerReview',
    hebKey: 'דירוג מתנדב',
    cellRenderer: (review: OrganizationReview) => review.rating
  },
  {
    key: 'requestReview',
    hebKey: 'הערת מארח',
    cellRenderer: (review: OrganizationReview) => review.description
  },
  {
    key: 'requestReview',
    hebKey: 'דירוג מארח',
    cellRenderer: (review: OrganizationReview) => review.rating
  },
  {
    key: 'date',
    hebKey: 'תאריך',
    isTableColumn: true,
    cellRenderer: (date: string) => moment(date).format('DD-MM-YYYY')
  }
];
