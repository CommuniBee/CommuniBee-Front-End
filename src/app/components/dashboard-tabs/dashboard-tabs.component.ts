import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {VolunteeringEventsService} from '../../services/communibee-backend/volunteering-events/volunteering-events.service';
import {AuthService} from '../../services/communibee-backend/auth/auth.service';
import {VolunteeringRequestsService} from '../../services/communibee-backend/volunteering-requests/volunteering-requests.service';
import {VolunteeringOffersService} from '../../services/communibee-backend/volunteering-offers/volunteering-offers.service';
import {VolunteeringBaseModel} from '../../services/communibee-backend/common-models/volunteering-request-offer-base';
import {GenericColumn} from '../generic-table/generic-column';
import {offerRequestTableColumns} from '../../const/offer-request-table-columns/offer-request-table-columns';
import {eventColumns} from '../../const/event-columns/event-columns';
import {VolunteeringEventModel} from '../../services/communibee-backend/volunteering-events/volunteering-event';

@Component({
  selector: 'app-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.css']
})
export class DashboardTabsComponent implements OnInit {
  organization: string;
  offersAndRequests: VolunteeringBaseModel[];
  futureEvents: VolunteeringEventModel[];
  historyEvents: VolunteeringEventModel[];
  offerRequestTableColumns: GenericColumn[];
  eventColumns: GenericColumn[];
  selectedTab: number;

  constructor(private authService: AuthService,
              private volunteeringRequestsService: VolunteeringRequestsService,
              private volunteeringOffersService: VolunteeringOffersService,
              private eventsService: VolunteeringEventsService) {
    this.offerRequestTableColumns = offerRequestTableColumns;
    this.eventColumns = eventColumns;
    this.offersAndRequests = [];
    this.futureEvents = [];
    this.historyEvents = [];
    this.selectedTab = 0;
  }

  async ngOnInit() {
    this.organization = this.authService.getUserMetadata().organization;
    this.assignApplications();
    this.getAllEvents();
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }

  async assignApplications(): Promise<void> {
    const volRequests: VolunteeringBaseModel[] = await this.volunteeringRequestsService.getAll();
    const volOffers: VolunteeringBaseModel[] = await this.volunteeringOffersService.getAll();
    const allVolunteeringApplications: VolunteeringBaseModel[] = [...volRequests, ...volOffers];
    this.offersAndRequests = allVolunteeringApplications.filter((application) => {
      return this.organization === application.organization;
    });
  }

  async getAllEvents(): Promise<void> {
    const allEvents: VolunteeringEventModel[] = (await this.eventsService.getAll())
      .filter((event) => {
        return [event.request.organization, event.offer.organization].includes(this.organization);
      });
    [this.historyEvents, this.futureEvents] = _.partition(allEvents, (event) => event.isDone);
  }
}
