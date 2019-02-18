import { Pipe, PipeTransform } from '@angular/core';
import {GenericColumn} from '../components/generic-table/generic-column';

@Pipe({
  name: 'tableColumns'
})
export class TableColumnsPipe implements PipeTransform {
  transform(columns: GenericColumn[]): any {
    return columns.filter(col => col.isTableColumn);
  }
}
