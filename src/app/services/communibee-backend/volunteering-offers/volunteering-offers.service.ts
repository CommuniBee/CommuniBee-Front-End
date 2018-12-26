import { Injectable } from '@angular/core';
import { BackendModelService } from '../basic-model.service';
import { BackendHttpService } from '../backend-http.service';
import { VolunteeringOffer, VolunteeringOfferModel } from './volunteering-offer';

const path = 'volunteering-offers';

@Injectable({
  providedIn: 'root',
})
export class VolunteeringOffersService extends BackendModelService<VolunteeringOffer, VolunteeringOfferModel> {

  constructor(private backendHttpService: BackendHttpService) {
    super(path, backendHttpService);
  }
}
