import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VolunteeringRequestsService } from '../../services/communibee-backend/volunteering-requests/volunteering-requests.service';
import { VolunteeringRequest } from '../../services/communibee-backend/volunteering-requests/volunteering-request';
import { AuthService } from '../../services/communibee-backend/auth/auth.service';
import { Router } from '@angular/router';
import { ContentService } from '../../services/communibee-backend/content/content.service';
import { BasicContentModel } from '../../services/communibee-backend/content/content';

@Component({
  selector: 'app-add-volunteering-opportunity',
  templateUrl: './add-volunteering-opportunity.component.html',
  styleUrls: ['./add-volunteering-opportunity.component.scss'],
})
export class AddVolunteeringOpportunityComponent implements OnInit {
  public form: FormGroup;
  content: BasicContentModel[];

  constructor(private fb: FormBuilder,
              private vltrReq: VolunteeringRequestsService,
              private contentService: ContentService,
              private auth: AuthService,
              private router: Router) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      about: ['', Validators.required],
      content: [null],
      days: this.fb.group({
        1: [true],
        2: [true],
        3: [true],
        4: [true],
        5: [true],
        6: [false],
        7: [false],
      }),
      poc: this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
      }),
      address: ['', Validators.required],
      region: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.content = await this.contentService.getAll({ title: true });
  }

  sendData() {
    if (!this.form.valid) {
      return;
    }
    const formValues = this.form.value;
    const volunteeringRequest: VolunteeringRequest = this.formValues2volunteeringRequestModel(formValues);

    console.log(volunteeringRequest);

    this.vltrReq.create(volunteeringRequest).then(volunteeringRequestDocument => {
      if (volunteeringRequestDocument) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  formValues2volunteeringRequestModel(formValues): VolunteeringRequest {
    const volunteeringRequest: VolunteeringRequest = {} as any;

    volunteeringRequest.title = formValues.title;
    volunteeringRequest.about = formValues.about;
    volunteeringRequest.content = formValues.content;
    volunteeringRequest.contact = {} as any;
    volunteeringRequest.multiOccurrence = false;
    volunteeringRequest.contact.name = formValues.poc.name;
    volunteeringRequest.contact.phone = formValues.poc.phone;
    volunteeringRequest.contact.email = formValues.poc.email;
    volunteeringRequest.createdByUserId = this.auth.getUserId();

    return volunteeringRequest;
  }

  daysCheckboxsToArray(days): number[] {
    const availableWeekdays: number[] = [];
    if (days['1']) { availableWeekdays.push(0); }
    if (days['2']) { availableWeekdays.push(1); }
    if (days['3']) { availableWeekdays.push(2); }
    if (days['4']) { availableWeekdays.push(3); }
    if (days['5']) { availableWeekdays.push(4); }
    if (days['6']) { availableWeekdays.push(5); }
    if (days['7']) { availableWeekdays.push(6); }

    return availableWeekdays;
  }

}
