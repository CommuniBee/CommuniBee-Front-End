import { Component, OnInit } from '@angular/core';
import {RegionService} from '../../services/communibee-backend/region/region.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/communibee-backend/auth/auth.service';
import {VolunteeringOffersService} from '../../services/communibee-backend/volunteering-offers/volunteering-offers.service';

@Component({
  selector: 'app-add-volunteers',
  templateUrl: './add-volunteers.component.html',
  styleUrls: ['./add-volunteers.component.scss']
})
export class AddVolunteersComponent implements OnInit {
  public myForm: FormGroup;
  regions: [string] = [] as any;

  constructor(private regionsSrv: RegionService,
              private fb: FormBuilder,
              private vltrOffer: VolunteeringOffersService,
              private auth: AuthService,
              private rotuer: Router) {
    this.initForm();
  }

  ngOnInit() {
    this.regionsSrv.getAll().then( regions_res => {
      this.regions =  regions_res as any;
      this.initForm();
    });
  }

  initForm() {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      poc: this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required]
      }),
      numberOfVolunteers: ['', Validators.required],
      availableContent: [''],
      days: this.fb.group({
        1: [false],
        2: [false],
        3: [false],
        4: [false],
        5: [false],
        6: [false],
        7: [false]
      }),
      regions: this.fb.array(this.regions.map(region => this.fb.control(false))),
    });
  }


  sendData() {
    console.log(this.myForm.value);
  }

}
