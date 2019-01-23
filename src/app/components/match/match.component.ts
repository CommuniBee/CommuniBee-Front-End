import { Component, OnInit } from '@angular/core';
import {VolunteeringRequestsService} from '../../services/communibee-backend/volunteering-requests/volunteering-requests.service';
import {VolunteeringOffersService} from '../../services/communibee-backend/volunteering-offers/volunteering-offers.service';
import {VolunteeringEventsService} from '../../services/communibee-backend/volunteering-events/volunteering-events.service';
import {VolunteeringOffer} from '../../services/communibee-backend/volunteering-offers/volunteering-offer';
import {VolunteeringRequest} from '../../services/communibee-backend/volunteering-requests/volunteering-request';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbCalendar, NgbDate, NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  matchForm: FormGroup;
  date: NgbDateStruct;

  time = { hour: 0, minute: 0 };
  eventDate: Date = new Date();

  volunteeringRequests: VolunteeringRequest[] = [];
  volunteeringOffers: VolunteeringOffer[] = [];
  selectedRequest: VolunteeringRequest;
  selectedOffer: VolunteeringOffer;

  constructor(private volunteeringRequestsService: VolunteeringRequestsService,
              private volunteeringOffersService: VolunteeringOffersService,
              private volunteeringEventsService: VolunteeringEventsService,
              private formBuilder: FormBuilder,
              private calendar: NgbCalendar) { }

  ngOnInit() {
    this.volunteeringRequestsService.getAll().then(requests => { this.volunteeringRequests = requests; });
    this.volunteeringOffersService.getAll().then(offers => { this.volunteeringOffers = offers; });

    this.date = this.calendar.getToday();
    const now  = new Date();
    this.time = { hour: now.getHours(), minute: now.getMinutes() };

    this.matchForm = this.formBuilder.group({
      request: [undefined, Validators.required],
      offer: [undefined, Validators.required],
      date: [now, Validators.required],
    });
  }

  onSelectRequest(request: VolunteeringRequest): void {
    this.selectedRequest = request;
  }

  onSelectOffer(offer: VolunteeringOffer): void {
    this.selectedOffer = offer;
  }

  onDateSelect(date: NgbDateStruct): void {
    this.date = date;
    this.updateEventTime();
  }

  onTimeChange(time: NgbTimeStruct): void {
    this.time = time;
    this.updateEventTime();
  }

  updateEventTime() {
    this.eventDate = new Date(this.date.year, this.date.month - 1, this.date.day, this.time.hour, this.time.minute);
  }

}
