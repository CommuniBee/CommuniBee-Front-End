import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { VolunteeringRequestsService } from '../../services/communibee-backend/volunteering-requests/volunteering-requests.service';
import { VolunteeringOffersService } from '../../services/communibee-backend/volunteering-offers/volunteering-offers.service';
import { VolunteeringEventsService } from '../../services/communibee-backend/volunteering-events/volunteering-events.service';
import { VolunteeringEventModel } from '../../services/communibee-backend/volunteering-events/volunteering-event';
import { VolunteeringOfferModel } from '../../services/communibee-backend/volunteering-offers/volunteering-offer';
import { VolunteeringRequestModel } from '../../services/communibee-backend/volunteering-requests/volunteering-request';

declare var $;

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  matchForm: FormGroup;
  date: NgbDateStruct;

  event_Date: Date = new Date();

  volunteeringEvent: VolunteeringEventModel;
  volunteeringRequests: VolunteeringRequestModel[] = [];
  volunteeringOffers: VolunteeringOfferModel[] = [];
  plannedEvents: VolunteeringEventModel[];
  selectedOffer: VolunteeringOfferModel = {} as any;
  selectedRequest: VolunteeringRequestModel = {} as any;

  constructor(private volunteeringRequestsService: VolunteeringRequestsService,
              private volunteeringOffersService: VolunteeringOffersService,
              private volunteeringEventsService: VolunteeringEventsService,
              private formBuilder: FormBuilder,
              private calendar: NgbCalendar,
              private router: Router) { }

  ngOnInit() {
    this.volunteeringRequestsService.getUnmatched().then(requests => {
        this.volunteeringRequests = requests; });
    this.volunteeringOffersService.getUnmatched().then(offers => { this.volunteeringOffers = offers; });
    this.volunteeringEventsService.getPlannedEvent().then( planned => { this.plannedEvents = planned; });


    this.date = this.calendar.getToday();

    this.matchForm = this.formBuilder.group({
      title: [undefined, Validators.required],
      request: [undefined, Validators.required],
      offer: [undefined, Validators.required],
      eventDate: [this.date, Validators.required],
    });
  }

  onSelectRequest(request: VolunteeringRequestModel): void {
    this.selectedRequest = request;
    this.matchForm.get('request').setValue(this.selectedRequest._id);
    const currentTitle = this.matchForm.get('title').value;
    if ( currentTitle == null ) {
      this.matchForm.get('title').setValue(this.selectedRequest.title + ' עבור ' + this.selectedRequest.organization + ' על ידי ');
    } else {
      this.matchForm.get('title').setValue(this.selectedRequest.title + ' עבור ' +
       this.selectedRequest.organization + ' על ידי ' + currentTitle.split('על ידי')[1].trim());
    }
  }

  onSelectOffer(offer: VolunteeringOfferModel) {
    this.selectedOffer = offer;
    this.matchForm.get('offer').setValue(this.selectedOffer._id);
    const currentTitle = this.matchForm.get('title').value;
    if ( currentTitle == null ) {
      this.matchForm.get('title').setValue(' על ידיי ' + this.selectedOffer.organization);
    } else {
        this.matchForm.get('title').setValue(currentTitle.split('על ידי')[0].trim() + ' על ידי ' + this.selectedOffer.organization);
    }
  }

  sendData() {
    const event: any = this.matchForm.value;
    this.volunteeringEvent = {
      title: event.title,
      offer: event.offer,
      request: event.request
    } as any;
    this.volunteeringEvent.date = new Date( event.eventDate.year,
        event.eventDate.month - 1,
        event.eventDate.day );
    this.volunteeringEventsService.create(this.volunteeringEvent).then(response => {
        if (response) {
            this.volunteeringRequestsService.setMatched(event.request, true);
            this.volunteeringOffersService.setMatched(event.offer, true);
            this.volunteeringRequests = this.volunteeringRequests.filter(item => item._id !== event.request);
            this.volunteeringOffers = this.volunteeringOffers.filter(item => item._id !== event.offer);
            this.volunteeringEvent.offer = this.selectedOffer;
            this.volunteeringEvent.request = this.selectedRequest;
            this.volunteeringEvent._id = response._id;
            this.plannedEvents.push(this.volunteeringEvent);
            this.matchForm.reset();
        }
    });
  }

  cancelEvent(volunteeringEvent: VolunteeringEventModel ) {
    this.volunteeringEventsService.delete(volunteeringEvent._id).then(response => {
        if (response) {
            this.volunteeringRequestsService.setMatched(volunteeringEvent.request._id, false);
            this.volunteeringOffersService.setMatched(volunteeringEvent.offer._id, false);
            this.volunteeringRequests.push(volunteeringEvent.request);
            this.volunteeringOffers.push(volunteeringEvent.offer);
            this.plannedEvents = this.plannedEvents.filter(item => item._id !== volunteeringEvent._id);
        }
    });
  }

  openMatchFormModal() {
    $('#modalMatchForm').modal('toggle');
  }
}
