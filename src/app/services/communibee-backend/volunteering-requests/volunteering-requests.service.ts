import { Injectable } from '@angular/core';
import { BeckendModelService } from '../basic-model.service';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';
import { BeckendHttpService } from '../beckend-http.service';
import { VolunteeringRequest, VolunteeringRequestModel } from './volunteering-request';

const path = '/volunteering-requests';

@Injectable({
  providedIn: 'root',
})
export class VolunteeringRequestsService extends BeckendModelService<VolunteeringRequest, VolunteeringRequestModel> {

  constructor(private communiHttp: BeckendHttpService, private errorHandlerService: ErrorHandlerService) {
    super(path, communiHttp, errorHandlerService);
  }
}
