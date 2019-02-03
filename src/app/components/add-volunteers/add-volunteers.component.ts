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
      multiOccurrence: [''],
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
    console.log('forms values: ', formValues);
    console.log('content: ', this.content);
    const volunteeringOffer: VolunteeringOffer = {} as any;
    volunteeringOffer.title = formValues.title;
    volunteeringOffer.contact = formValues.poc;
    volunteeringOffer.numberOfVolunteers = formValues.numberOfVolunteers;
    volunteeringOffer.content = this.content;
    volunteeringOffer.multiOccurrence = formValues.multiOccurrence;
    volunteeringOffer.regions = this.regionCheckboxsToRegionArray(formValues.regions);
    volunteeringOffer.createdByUserId = this.auth.getLocalUserId();

    return volunteeringOffer;
  }

  openContentModal() {
    this.isFileSelected = false;
    $('#modalContentUpload').modal('toggle');
  }

  onContentTitleLoaded(changedContent: ContentModel) {
    this.myForm.patchValue({
      availableContent: changedContent.title
    });
    this.content = changedContent;
    this.isFileSelected = true;
  }
}
