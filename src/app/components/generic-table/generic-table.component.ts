import {Component, Input} from '@angular/core';
import {GenericColumn} from './generic-column';
import {TableType} from '../../models/table-type';
import {VolunteeringEvent} from '../../services/communibee-backend/volunteering-events/volunteering-event';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {
  @Input() tableType: TableType;
  @Input() elements: any[];
  @Input() columns: GenericColumn[];
  selectedElement: any;

  displayRow(element: any) {
    this.selectedElement = element;
  }

  modalClosed(): void {
    this.selectedElement = undefined;
  }

  cellClicked(callback: (element: any, event: any) => void, element: any, event: any): void {
    if (callback) {
      callback(element, event);
    }
  }

  getModalTitle(): string {
    switch (this.tableType) {
      case TableType.FUTURE_EVENTS:
      case TableType.HISTORY_EVENTS:
        return (<VolunteeringEvent>this.selectedElement).title;
      case TableType.OFFERS_REQUESTS:
        const requestOrOffer: any = this.selectedElement;
        return (requestOrOffer.title) || (requestOrOffer.content ? requestOrOffer.content.title : '');
      default:
        return '';
    }
  }
}
