import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-volunteering-opportunity',
  templateUrl: './add-volunteering-opportunity.component.html',
  styleUrls: ['./add-volunteering-opportunity.component.scss']
})
export class AddVolunteeringOpportunityComponent implements OnInit {
  form : FormGroup = this.fb.group({

  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
