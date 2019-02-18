import {Injectable} from '@angular/core';
import {ErrorHandlerService} from '../../error-handler/error-handler.service';
import {BackendModelService} from '../basic-model.service';
import {BackendHttpService} from '../backend-http.service';
import {OrganizationReview, VolunteeringEvent, VolunteeringEventModel} from './volunteering-event';
import {VolunteeringOfferModel} from '../volunteering-offers/volunteering-offer';
import {VolunteeringRequestModel} from '../volunteering-requests/volunteering-request';

const path = 'volunteering-events';

@Injectable({
  providedIn: 'root',
})
export class VolunteeringEventsService extends BackendModelService<VolunteeringEvent, VolunteeringEventModel> {

  constructor(private backendHttpService: BackendHttpService) {
    super(path, backendHttpService);
  }

  async finishAndRateEvent(event: VolunteeringEventModel): Promise<VolunteeringRequestModel> {
    const eventId: string = event._id;
    const offerReview: OrganizationReview = event.offerReview;
    const requestReview: OrganizationReview = event.requestReview;
    try {
      return await this.backendHttp.put(
        `${path}/${eventId}`,
        {isDone: true, offerReview, requestReview}
      );
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
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
