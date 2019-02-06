import {Component, OnInit} from '@angular/core';
import {VolunteeringEventsService} from '../../services/communibee-backend/volunteering-events/volunteering-events.service';
import {AuthService} from '../../services/communibee-backend/auth/auth.service';
import {VolunteeringRequestsService} from '../../services/communibee-backend/volunteering-requests/volunteering-requests.service';
import {VolunteeringOffersService} from '../../services/communibee-backend/volunteering-offers/volunteering-offers.service';
import {VolunteeringBaseModel} from '../../services/communibee-backend/common-models/volunteering-request-offer-base';
import {GenericColumn} from "../generic-table/generic-column";
import {OfferRequestTableColumns} from "../../model/offer-request-table-columns/offer-request-table-columns";

@Component({
  selector: 'app-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.css']
})
export class DashboardTabsComponent implements OnInit {
  organization: string;
  volunteeringApplications: VolunteeringBaseModel[];
  offerRequestTableColumns: GenericColumn[];
  events: any;

  selectedTab: number;

  constructor(private authService: AuthService,
              private volunteeringRequestsService: VolunteeringRequestsService,
              private volunteeringOffersService: VolunteeringOffersService,
              private eventsService: VolunteeringEventsService) {
    this.volunteeringApplications = [];
    this.offerRequestTableColumns = [];
    this.selectedTab = 0;
  }

  async ngOnInit() {
    this.organization = this.authService.getUserMetadata().organization;
    this.assignApplications();
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }

  async assignApplications(): Promise<void> {
    this.offerRequestTableColumns = OfferRequestTableColumns;
    const volRequests: VolunteeringBaseModel[] = await this.volunteeringRequestsService.getAll();
    const volOffers: VolunteeringBaseModel[] = await this.volunteeringOffersService.getAll();
    const allVolunteeringApplications: VolunteeringBaseModel[] = [...volRequests, ...volOffers];
    this.volunteeringApplications = allVolunteeringApplications.filter((application) => {
      return this.organization === application.organization;
    });
  }
}
