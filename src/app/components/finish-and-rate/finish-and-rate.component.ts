import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  OrganizationReview,
  VolunteeringEventModel
} from "../../services/communibee-backend/volunteering-events/volunteering-event";
import {AuthService} from "../../services/communibee-backend/auth/auth.service";

@Component({
  selector: 'app-finish-and-rate',
  templateUrl: './finish-and-rate.component.html',
  styleUrls: ['./finish-and-rate.component.scss']
})
export class FinishAndRateComponent implements OnInit {
  @Input() event: VolunteeringEventModel;
  @Output() confirm: EventEmitter<void>;
  reviewToEdit: OrganizationReview;
  userId: string;
  organization: string;


  constructor(private authService: AuthService) {
    this.confirm = new EventEmitter();
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.organization = this.authService.getUserMetadata().organization;
    this.organizationReviewFromEvent();
  }

  finishEvent(): void {
    this.event.isDone = true;
    this.confirm.emit();
  }

  changeEventRating(event: any): void {
    this.reviewToEdit.rating = parseInt(event.target.value);
  }

  private organizationReviewFromEvent(): void {
    const defaultReview: OrganizationReview = {description: '', rating: 0, createdByUserId: this.userId};
    if (this.organization === this.event.offer.organization) {
      this.event.offerReview = this.event.offerReview || defaultReview;
      this.reviewToEdit = this.event.offerReview;
    } else {
      this.event.requestReview = this.event.requestReview || defaultReview;
      this.reviewToEdit = this.event.requestReview;
    }
  }
}
