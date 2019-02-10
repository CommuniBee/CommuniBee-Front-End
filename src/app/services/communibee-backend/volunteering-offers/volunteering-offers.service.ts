import { Injectable } from '@angular/core';
import { BackendModelService } from '../basic-model.service';
import { BackendHttpService } from '../backend-http.service';
import { VolunteeringOffer, VolunteeringOfferModel } from './volunteering-offer';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';

const path = 'volunteering-offers';

@Injectable({
  providedIn: 'root',
})
export class VolunteeringOffersService extends BackendModelService<VolunteeringOffer, VolunteeringOfferModel> {

  constructor(private backendHttpService: BackendHttpService) {
    super(path, backendHttpService);
  }

  async setMatchced(eventId: string, isMatched: boolean) {
   try {
      if (isMatched) {
        return await this.backendHttp.put(`${path}/matched/${eventId}`, {});
      } else {
        return await this.backendHttp.put(`${path}/unmatched/${eventId}`, {});
      }

    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }
}
