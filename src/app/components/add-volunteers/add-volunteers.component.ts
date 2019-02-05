import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/communibee-backend/auth/auth.service';
import {VolunteeringOffersService} from '../../services/communibee-backend/volunteering-offers/volunteering-offers.service';
import {VolunteeringOffer} from '../../services/communibee-backend/volunteering-offers/volunteering-offer';
import {CategoryModel} from '../../services/communibee-backend/category/category';
import {ContentModel} from '../../services/communibee-backend/content/content';
import {ContentService} from '../../services/communibee-backend/content/content.service';
import {SubRegionsModel} from '../../services/communibee-backend/subregion/subregion';
import {SubRegionService} from '../../services/communibee-backend/subregion/subregion.service';


declare var $;

@Component({
  selector: 'app-add-volunteers',
  templateUrl: './add-volunteers.component.html',
  styleUrls: ['./add-volunteers.component.scss'],
})
export class AddVolunteersComponent implements OnInit {
  public myForm: FormGroup;
  regions: string[] = [] as any;
  categories: CategoryModel[];
  subRegions: SubRegionsModel[];
  contentList: ContentModel[];
  information: string;
  contentCategory: any;

  constructor(private subRegionsSrv: SubRegionService,
              private contentSrv: ContentService,
              private fb: FormBuilder,
              private vltrOffer: VolunteeringOffersService,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.subRegionsSrv.getAll().then(subregions_res => {
      this.subRegions = subregions_res;
    });
    this.contentSrv.getAll().then(content_res => {
      this.contentList = content_res;
    });
    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({
      organization: [this.auth.getUserOrganization(), Validators.required],
      poc: this.fb.group({
        name: [this.auth.getUserName(), Validators.required],
        phone: ['', Validators.required],
        email: [this.auth.getUserEmail(), [Validators.required, Validators.email]],
      }),
      numberOfVolunteers: ['', Validators.min(1)],
      availableContent: [''],
      multiOccurrence: [false],
      regions: [[this.auth.getOrganizationLocation()]],
    });
  }

  sendData() {
    const formValues = this.myForm.value;
    const volunteeringOffer: VolunteeringOffer = this.formValues2volunteeringOfferModel(formValues);

    this.vltrOffer.create(volunteeringOffer).then(volunteeringOfferDocument => {
      if (volunteeringOfferDocument) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  formValues2volunteeringOfferModel(formValues): VolunteeringOffer {
    const volunteeringOffer: VolunteeringOffer = {} as any;
    volunteeringOffer.organization = formValues.organization;
    volunteeringOffer.contact = formValues.poc;
    volunteeringOffer.numberOfVolunteers = formValues.numberOfVolunteers;
    volunteeringOffer.content = formValues.availableContent;
    volunteeringOffer.multiOccurrence = formValues.multiOccurrence;
    volunteeringOffer.regions = formValues.regions;
    volunteeringOffer.createdByUserId = this.auth.getUserId();

    return volunteeringOffer;
  }

  openContentModal() {
    $('#modalContentUpload').modal('toggle');
  }

  onContentTitleLoaded(changedContent: ContentModel) {
    this.contentList = [...this.contentList, changedContent];
    this.myForm.patchValue({
      availableContent: changedContent._id
    });
  }

  groupByRegion(regionItem: SubRegionsModel) {
   return regionItem.region.name;
  }
}
