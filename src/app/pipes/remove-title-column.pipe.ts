import {Pipe, PipeTransform} from '@angular/core';
import {GenericColumn} from '../components/generic-table/generic-column';

@Pipe({
  name: 'removeTitleColumn'
})
export class RemoveTitleColumnPipe implements PipeTransform {
  transform(value: GenericColumn[], selectedElement: any): any {
    return value.filter(col => col.isTitleColumn ? !col.isTitleColumn(selectedElement) : true);
  }
}
