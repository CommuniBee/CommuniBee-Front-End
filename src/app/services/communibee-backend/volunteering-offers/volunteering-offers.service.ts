import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';
import { BeckendModelService } from '../basic-model.service';
import { BeckendHttpService } from '../beckend-http.service';
import { VolunteeringOffer, VolunteeringOfferModel } from './volunteering-offer';

const path = 'volunteering-offers';

@Injectable({
  providedIn: 'root'
})
export class VolunteeringOffersService extends BeckendModelService<VolunteeringOffer, VolunteeringOfferModel> {

  constructor(private communiHttp: BeckendHttpService, private errorHandlerService: ErrorHandlerService) {
    super(path, communiHttp, errorHandlerService);
  }
}
