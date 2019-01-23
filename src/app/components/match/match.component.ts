import { Component, OnInit } from '@angular/core';
import {VolunteeringRequestsService} from '../../services/communibee-backend/volunteering-requests/volunteering-requests.service';
import {VolunteeringOffersService} from '../../services/communibee-backend/volunteering-offers/volunteering-offers.service';
import {VolunteeringEventsService} from '../../services/communibee-backend/volunteering-events/volunteering-events.service';
import {VolunteeringOffer} from '../../services/communibee-backend/volunteering-offers/volunteering-offer';
import {VolunteeringRequest} from '../../services/communibee-backend/volunteering-requests/volunteering-request';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  volunteeringOffers: VolunteeringOffer[] = [];
  volunteeringRequests: VolunteeringRequest[] = [];

  constructor(private volunteeringRequestsService: VolunteeringRequestsService,
              private volunteeringOffersService: VolunteeringOffersService,
              private volunteeringEventsService: VolunteeringEventsService) { }

  ngOnInit() {
    this.volunteeringRequestsService.getAll().then(requests => { this.volunteeringRequests = requests; });
    this.volunteeringOffersService.getAll().then(offers => { this.volunteeringOffers = offers; });
  }

}
