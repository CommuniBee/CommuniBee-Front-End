import {Pipe, PipeTransform} from '@angular/core';
import {VolunteeringEventModel} from '../services/communibee-backend/volunteering-events/volunteering-event';

@Pipe({
  name: 'separateEvents'
})
export class SeparateEventsPipe implements PipeTransform {

  transform(events: VolunteeringEventModel[], isDone: boolean = false): any {
    return events.filter((event) => event.isDone === isDone);
  }
}
