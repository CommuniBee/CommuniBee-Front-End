import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {
  @Input() elements: any[];
  @Input() keys: string[];
  selectedElement: any;
  Object = Object;

  constructor() {
  }

  displayRow(element: any) {
    this.selectedElement = element;
  }
}
