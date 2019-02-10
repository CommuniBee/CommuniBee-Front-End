import { Injectable } from '@angular/core';
import { BackendModelService } from '../basic-model.service';
import { BackendHttpService } from '../backend-http.service';
import { VolunteeringRequest, VolunteeringRequestModel } from './volunteering-request';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';

const path = 'volunteering-requests';

@Injectable({
  providedIn: 'root',
})
export class VolunteeringRequestsService extends BackendModelService<VolunteeringRequest, VolunteeringRequestModel> {

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
