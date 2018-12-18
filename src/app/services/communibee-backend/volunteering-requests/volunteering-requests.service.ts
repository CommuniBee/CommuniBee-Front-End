import { Injectable } from '@angular/core';
import { BackendModelService } from '../basic-model.service';
import { BeckendHttpService } from '../beckend-http.service';
import { VolunteeringRequest, VolunteeringRequestModel } from './volunteering-request';

const path = '/volunteering-requests';

@Injectable({
  providedIn: 'root',
})
export class VolunteeringRequestsService extends BackendModelService<VolunteeringRequest, VolunteeringRequestModel> {

  constructor(private communiHttp: BeckendHttpService) {
    super(path, communiHttp);
  }
}
