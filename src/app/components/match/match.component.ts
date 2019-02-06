import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {VolunteeringRequestsService} from '../../services/communibee-backend/volunteering-requests/volunteering-requests.service';
import {VolunteeringOffersService} from '../../services/communibee-backend/volunteering-offers/volunteering-offers.service';
import {VolunteeringEventsService} from '../../services/communibee-backend/volunteering-events/volunteering-events.service';
import {VolunteeringOfferModel} from '../../services/communibee-backend/volunteering-offers/volunteering-offer';
import {VolunteeringBaseModel} from '../../services/communibee-backend/common-models/volunteering-request-offer-base';
import {VolunteeringEvent} from '../../services/communibee-backend/volunteering-events/volunteering-event';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  matchForm: FormGroup;
  date: NgbDateStruct;

  time = {hour: 0, minute: 0};
  eventDate: Date = new Date();

  volunteeringRequests: VolunteeringBaseModel[] = [];
  volunteeringOffers: VolunteeringBaseModel[] = [];
  selectedRequest: VolunteeringBaseModel = {_id: null} as VolunteeringBaseModel;
  selectedOffer: VolunteeringBaseModel = {_id: null} as VolunteeringBaseModel;

  constructor(private volunteeringRequestsService: VolunteeringRequestsService,
              private volunteeringOffersService: VolunteeringOffersService,
              private volunteeringEventsService: VolunteeringEventsService,
              private formBuilder: FormBuilder,
              private calendar: NgbCalendar,
              private router: Router) {
  }

  ngOnInit() {
    this.volunteeringRequestsService.getAll().then(requests => {
      this.volunteeringRequests = requests;
    });
    this.volunteeringOffersService.getAll().then(offers => {
      this.volunteeringOffers = offers;
    });

    this.date = this.calendar.getToday();
    const now = new Date();
    this.time = {hour: now.getHours(), minute: now.getMinutes()};

    this.matchForm = this.formBuilder.group({
      request: [undefined, Validators.required],
      offer: [undefined, Validators.required],
      date: [now, Validators.required],
    });
  }

  onSelectRequest(request: VolunteeringBaseModel): void {
    console.log(request);
    this.selectedRequest = request;
  }

  onSelectOffer(offer: VolunteeringOfferModel): void {
    console.log(offer);
    this.selectedOffer = offer;
  }

  updateEventTime() {
    this.eventDate = new Date(this.date.year, this.date.month - 1, this.date.day, this.time.hour, this.time.minute);
  }

  sendData() {
    const event: VolunteeringEvent = this.matchForm.value;
    console.log(event);

    this.volunteeringEventsService.create(event).then(response => {
      console.log(response);
      if (response) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

}
