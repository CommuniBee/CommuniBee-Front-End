import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';
import { BackendModelService } from '../basic-model.service';
import { BackendHttpService } from '../backend-http.service';
import { VolunteeringEvent, VolunteeringEventModel, VolunteeringRequestOfferBase } from './volunteering-event';

const path = 'volunteering-events';

@Injectable({
  providedIn: 'root',
})
export class VolunteeringEventsService extends BackendModelService<VolunteeringEvent, VolunteeringEventModel> {

  constructor(private backendHttpService: BackendHttpService) {
    super(path, backendHttpService);
  }

  async getRequestOfEvent(eventId: string): Promise<VolunteeringRequestOfferBase> {
    try {
      return await this.backendHttp.get(`${path}/${eventId}/request`);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

  async getOfferOfEvent(eventId: string): Promise<VolunteeringRequestOfferBase> {
    try {
      return await this.backendHttp.get(`${path}/${eventId}/offer`);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }
}
