import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VolunteeringRequestsService } from '../../services/communibee-backend/volunteering-requests/volunteering-requests.service';
import { VolunteeringRequest } from '../../services/communibee-backend/volunteering-requests/volunteering-request';
import { AuthService } from '../../services/communibee-backend/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-volunteering-opportunity',
  templateUrl: './add-volunteering-opportunity.component.html',
  styleUrls: ['./add-volunteering-opportunity.component.scss']
})
export class AddVolunteeringOpportunityComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private vltrReq: VolunteeringRequestsService, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      about: ['', Validators.required],
      content: [''],
      days: this.fb.group({
        1: [true],
        2: [true],
        3: [true],
        4: [true],
        5: [true],
        6: [false],
        7: [false]
      }),
      poc: this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required]
      }),
      address: ['', Validators.required],
      region: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  sendData() {
    if (!this.form.valid) { return; }
    const formValues = this.form.value;
    const volunteeringRequest: VolunteeringRequest = this.formValues2volunteeringRequestModel(formValues);

    console.log(volunteeringRequest);

    this.vltrReq.create(volunteeringRequest).then( volunteeringRequestDocument => {
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
    volunteeringRequest.availableWeekdays = this.daysCheckboxsToArray(formValues.days);
    volunteeringRequest.contact = {} as any;
    volunteeringRequest.contact.name = formValues.poc.name;
    volunteeringRequest.contact.phone = formValues.poc.phone;
    volunteeringRequest.contact.email = formValues.poc.email;
    volunteeringRequest.location = formValues.address;
    volunteeringRequest.region = formValues.region;
    volunteeringRequest.createdByUserId = this.auth.getLocalUserId();

    return volunteeringRequest;
  }

  daysCheckboxsToArray(days): [number] {
    const availableWeekdays: [number] = [] as any;
    if (days['1']) { availableWeekdays.push(1); }
    if (days['2']) { availableWeekdays.push(2); }
    if (days['3']) { availableWeekdays.push(3); }
    if (days['4']) { availableWeekdays.push(4); }
    if (days['5']) { availableWeekdays.push(5); }
    if (days['6']) { availableWeekdays.push(6); }
    if (days['7']) { availableWeekdays.push(7); }

    return availableWeekdays;
  }

}
