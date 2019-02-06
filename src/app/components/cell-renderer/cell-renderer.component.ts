import {Component, Input} from '@angular/core';
import {GenericColumn} from "../generic-table/generic-column";

@Component({
  selector: 'app-cell-renderer',
  templateUrl: './cell-renderer.component.html',
  styleUrls: ['./cell-renderer.component.scss']
})
export class CellRendererComponent {
  @Input() element: any;
  @Input() column: GenericColumn;
}
