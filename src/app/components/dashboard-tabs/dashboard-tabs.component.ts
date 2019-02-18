import {Component, OnInit} from '@angular/core';
import {VolunteeringEventsService} from '../../services/communibee-backend/volunteering-events/volunteering-events.service';
import {AuthService} from '../../services/communibee-backend/auth/auth.service';
import {VolunteeringRequestsService} from '../../services/communibee-backend/volunteering-requests/volunteering-requests.service';
import {VolunteeringOffersService} from '../../services/communibee-backend/volunteering-offers/volunteering-offers.service';
import {VolunteeringBaseModel} from '../../services/communibee-backend/common-models/volunteering-request-offer-base';
import {GenericColumn} from '../generic-table/generic-column';
import {offerRequestTableColumns} from '../../const/offer-request-table-columns/offer-request-table-columns';
import {VolunteeringEventModel} from '../../services/communibee-backend/volunteering-events/volunteering-event';
import {baseEventColumns} from '../../const/event-columns/event-columns';

@Component({
  selector: 'app-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.css']
})
export class DashboardTabsComponent implements OnInit {
  organization: string;
  offersAndRequests: VolunteeringBaseModel[];
  events: VolunteeringEventModel[];
  readonly offerRequestTableColumns: GenericColumn[] = offerRequestTableColumns;
  readonly eventsColumns = [...baseEventColumns, this.extraEventsColumns()];
  selectedTab: number;
  eventToFinish: VolunteeringEventModel;

  constructor(private authService: AuthService,
              private volunteeringRequestsService: VolunteeringRequestsService,
              private volunteeringOffersService: VolunteeringOffersService,
              private eventsService: VolunteeringEventsService) {
    this.offersAndRequests = [];
    this.events = [];
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
    this.offersAndRequests = !this.authService.isManager() ? allVolunteeringApplications.filter((application) => {
      return this.organization === application.organization;
    }) : allVolunteeringApplications;
  }

  async getAllEvents(): Promise<void> {
    let allEvents: VolunteeringEventModel[] = await this.eventsService.getAll();
    this.events = !this.authService.isManager() ? allEvents.filter((event) => {
      return [event.request.organization, event.offer.organization].includes(this.organization);
    }) : allEvents;
  }

  modalClosed(): void {
    this.eventToFinish = undefined;
  }

  async finishAndRate() {
    await this.eventsService.finishAndRateEvent(this.eventToFinish);
    this.eventToFinish = undefined;
    this.events = [...this.events];
  }

  private extraEventsColumns(): GenericColumn {
    return {
      key: 'isDone',
      hebKey: 'סטטוס האירוע',
      cellRenderer: (isDone: boolean) => {
        let buttonToDisplay = `<span class='btn btn-success shadow-none'>דרג וסגור אירוע</span>`;
        if (isDone) {
          buttonToDisplay = `<span class='btn btn-primary shadow-none'>דרג אירוע</span>`;
        }
        return buttonToDisplay;
      },
      isTableColumn: true,
      onClick: this.doneAndRateEvent.bind(this)
    };
  }

  private doneAndRateEvent(eventToFinish: VolunteeringEventModel, domEvent: Event): void {
    this.eventToFinish = this.events.find((event) => eventToFinish._id === event._id);
    domEvent.stopPropagation();
  }
}
