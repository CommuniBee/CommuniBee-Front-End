import {Component, Input} from '@angular/core';
import {GenericColumn} from './generic-column';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {
  @Input() uniqueTableName: string;
  @Input() elements: any[];
  @Input() columns: GenericColumn[];
  selectedElement: any;

  constructor() {
    this.selectedElement = {};
  }

  displayRow(element: any) {
    this.selectedElement = element;
  }
}
