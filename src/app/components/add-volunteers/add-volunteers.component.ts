import {Component, OnInit} from '@angular/core';
import {RegionService} from '../../services/communibee-backend/region/region.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/communibee-backend/auth/auth.service';
import {VolunteeringOffersService} from '../../services/communibee-backend/volunteering-offers/volunteering-offers.service';
import {VolunteeringOffer} from '../../services/communibee-backend/volunteering-offers/volunteering-offer';
import {CategoryModel} from '../../services/communibee-backend/category/category';
import {ContentModel} from '../../services/communibee-backend/content/content';


declare var $;

@Component({
  selector: 'app-add-volunteers',
  templateUrl: './add-volunteers.component.html',
  styleUrls: ['./add-volunteers.component.scss'],
})
export class AddVolunteersComponent implements OnInit {
  public myForm: FormGroup;
  regions: string[] = [] as any;
  categories: CategoryModel[] = [] as any;
  content: ContentModel = {} as any;
  information: string;
  contentTitle: string;
  contentCategory: any;
  isFileSelected = false;

  constructor(private regionsSrv: RegionService,
              private fb: FormBuilder,
              private vltrOffer: VolunteeringOffersService,
              private auth: AuthService,
              private router: Router) {
    this.initForm();
  }

  ngOnInit() {
    this.regionsSrv.getAll().then(regions_res => {
      this.regions = regions_res as any;
      this.initForm();
    });

  }

  initForm() {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      poc: this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.email],
      }),
      numberOfVolunteers: ['', Validators.min(1)],
      availableContent: [''],
      days: this.fb.group({
        1: [false],
        2: [false],
        3: [false],
        4: [false],
        5: [false],
        6: [false],
        7: [false],
      }),
      regions: this.fb.array(this.regions.map(region => this.fb.control(false))),
    });
  }

  sendData() {
    const formValues = this.myForm.value;
    const volunteeringOffer: VolunteeringOffer = this.formValues2volunteeringOfferModel(formValues);

    console.log(volunteeringOffer);

    this.vltrOffer.create(volunteeringOffer).then(volunteeringOfferDocument => {
      console.log(volunteeringOfferDocument);
      if (volunteeringOfferDocument) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  regionCheckboxsToRegionArray(regionCheckboxArray: [boolean]) {
    const availableRegions: [string] = [] as any;
    regionCheckboxArray.forEach((regionChecked, i) => {
      if (regionChecked) {
        availableRegions.push(this.regions[i]);
      }
    });

    return availableRegions;
  }

  formValues2volunteeringOfferModel(formValues): VolunteeringOffer {
    const volunteeringOffer: VolunteeringOffer = {} as any;
    volunteeringOffer.title = formValues.title;
    volunteeringOffer.contact = formValues.poc;
    volunteeringOffer.numberOfVolunteers = formValues.numberOfVolunteers;
    volunteeringOffer.availableContent = formValues.availableContent;
    volunteeringOffer.availableWeekdays = this.daysCheckboxsToArray(formValues.days);
    volunteeringOffer.regions = this.regionCheckboxsToRegionArray(formValues.regions);
    volunteeringOffer.createdByUserId = this.auth.getLocalUserId();
    volunteeringOffer.availableContent = this.content._id;

    return volunteeringOffer;
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

  openContentModal() {
    this.isFileSelected = false;
    $('#modalContentUpload').modal('toggle');
  }

  onContentTitleLoaded(title: string) {
    this.myForm.patchValue({
      availableContent: title
    });
    this.isFileSelected = true;
  }
}
