import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';
import { BackendModelService } from '../basic-model.service';
import { BeckendHttpService } from '../beckend-http.service';
import { VolunteeringRequestOfferBase, VoulunteeringEvent, VoulunteeringEventModel } from './volunteering-event';

const path = 'volunteering-events';

@Injectable({
  providedIn: 'root',
})
export class VolunteeringEventsService extends BackendModelService<VoulunteeringEvent, VoulunteeringEventModel> {

  constructor(private communiHttp: BeckendHttpService) {
    super(path, communiHttp);
  }

  async getRequestOfEvent(eventId: string): Promise<VolunteeringRequestOfferBase> {
    try {
      return await this.beckendHttpService.get(`${path}/${eventId}/request`);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

  async getofferOfEvent(eventId: string): Promise<VolunteeringRequestOfferBase> {
    try {
      return await this.beckendHttpService.get(`${path}/${eventId}/offer`);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }
}
