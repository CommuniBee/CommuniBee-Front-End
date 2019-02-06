import {Component, Input} from '@angular/core';
import {GenericColumn} from "./generic-column";

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {
  @Input() elements: any[];
  @Input() genericColumns: GenericColumn[];
  selectedElement: any;

  displayRow(element: any) {
    this.selectedElement = element;
  }
}
