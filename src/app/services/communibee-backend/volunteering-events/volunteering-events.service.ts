import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';
import { BackendModelService } from '../basic-model.service';
import { BackendHttpService } from '../backend-http.service';
import { VolunteeringEvent, VolunteeringEventModel } from './volunteering-event';
import { VolunteeringOfferModel } from '../volunteering-offers/volunteering-offer';
import { VolunteeringRequestModel } from '../volunteering-requests/volunteering-request';

const path = 'volunteering-events';

@Injectable({
  providedIn: 'root',
})
export class VolunteeringEventsService extends BackendModelService<VolunteeringEvent, VolunteeringEventModel> {

  constructor(private backendHttpService: BackendHttpService) {
    super(path, backendHttpService);
  }

  async getPlannedEvent() {
   try {
      return await this.backendHttp.get(`${path}`, 'isDone=false');
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

  async getRequestOfEvent(eventId: string): Promise<VolunteeringRequestModel> {
    try {
      return await this.backendHttp.get(`${path}/${eventId}/request`);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

  async getOfferOfEvent(eventId: string): Promise<VolunteeringOfferModel> {
    try {
      return await this.backendHttp.get(`${path}/${eventId}/offer`);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }
}
