import { Injectable } from '@angular/core';
import { BackendModelService } from '../basic-model.service';
import { BackendHttpService } from '../backend-http.service';
import { VolunteeringRequest, VolunteeringRequestModel } from './volunteering-request';

const path = 'volunteering-requests';

@Injectable({
  providedIn: 'root',
})
export class VolunteeringRequestsService extends BackendModelService<VolunteeringRequest, VolunteeringRequestModel> {

  constructor(private backendHttpService: BackendHttpService) {
    super(path, backendHttpService);
  }
}
