import {Component, OnInit} from '@angular/core';
import {VolunteeringEventsService} from '../../services/communibee-backend/volunteering-events/volunteering-events.service';
import {AuthService} from '../../services/communibee-backend/auth/auth.service';
import {VolunteeringRequestsService} from '../../services/communibee-backend/volunteering-requests/volunteering-requests.service';
import {VolunteeringOffersService} from '../../services/communibee-backend/volunteering-offers/volunteering-offers.service';
import {VolunteeringBaseModel} from '../../services/communibee-backend/common-models/volunteering-request-offer-base';

@Component({
  selector: 'app-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.css']
})
export class DashboardTabsComponent implements OnInit {
  userId: string;
  volunteeringApplications: VolunteeringBaseModel[];
  events: any;

  selectedTab: number;

  constructor(private authService: AuthService,
              private volunteeringRequestsService: VolunteeringRequestsService,
              private volunteeringOffersService: VolunteeringOffersService,
              private eventsService: VolunteeringEventsService) {
    this.volunteeringApplications = [];
    this.selectedTab = 0;
  }

  async ngOnInit() {
    this.assignApplications();
    this.userId = this.authService.getUserId();

    this.events = [
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'}
    ];
    // this.events = await this.eventsService.getAll();
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }

  async assignApplications(): Promise<void> {
    const volRequests: VolunteeringBaseModel[] = await this.volunteeringRequestsService.getAll();
    const volOffers: VolunteeringBaseModel[] = await this.volunteeringOffersService.getAll();
    const allVolunteeringApplications: VolunteeringBaseModel[] = [...volRequests, ...volOffers];
    this.volunteeringApplications = allVolunteeringApplications.filter((application) => {
      return this.userId === application.createdByUserId;
    });
  }
}
