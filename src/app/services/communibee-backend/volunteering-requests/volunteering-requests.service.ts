import {Injectable} from '@angular/core';
import {BackendModelService} from '../basic-model.service';
import {BackendHttpService} from '../backend-http.service';
import {VolunteeringBaseModel, VolunteeringRequestOfferBase} from '../common-models/volunteering-request-offer-base';

const path = 'volunteering-requests';

@Injectable({
  providedIn: 'root',
})
export class VolunteeringRequestsService extends BackendModelService<VolunteeringRequestOfferBase, VolunteeringBaseModel> {

  constructor(private backendHttpService: BackendHttpService) {
    super(path, backendHttpService);
  }
}
