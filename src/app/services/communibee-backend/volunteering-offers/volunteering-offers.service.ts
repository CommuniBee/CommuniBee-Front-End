import { Injectable } from '@angular/core';
import { BackendModelService } from '../basic-model.service';
import { BeckendHttpService } from '../beckend-http.service';
import { VolunteeringOffer, VolunteeringOfferModel } from './volunteering-offer';

const path = 'volunteering-offers';

@Injectable({
  providedIn: 'root',
})
export class VolunteeringOffersService extends BackendModelService<VolunteeringOffer, VolunteeringOfferModel> {

  constructor(private communiHttp: BeckendHttpService) {
    super(path, communiHttp);
  }
}
