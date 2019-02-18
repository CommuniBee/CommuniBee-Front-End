import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VolunteeringRequestsService } from '../../services/communibee-backend/volunteering-requests/volunteering-requests.service';
import { VolunteeringRequest } from '../../services/communibee-backend/volunteering-requests/volunteering-request';
import { AuthService } from '../../services/communibee-backend/auth/auth.service';
import { Router } from '@angular/router';
import { ContentService } from '../../services/communibee-backend/content/content.service';
import { BasicContentModel } from '../../services/communibee-backend/content/content';
import { ContentModel } from '../../services/communibee-backend/content/content';
import { SubRegionsModel } from '../../services/communibee-backend/subregion/subregion';
import { SubRegionService } from '../../services/communibee-backend/subregion/subregion.service';


declare var $;

@Component({
  selector: 'app-add-volunteering-opportunity',
  templateUrl: './add-volunteering-opportunity.component.html',
  styleUrls: ['./add-volunteering-opportunity.component.scss'],
})
export class AddVolunteeringOpportunityComponent implements OnInit {
  public form: FormGroup;
  content: BasicContentModel[];
  subRegions: SubRegionsModel[];
  contentList: ContentModel[];
  @ViewChild('modalContentUpload') contentModal: ElementRef;

  constructor(private fb: FormBuilder,
              private vltrReq: VolunteeringRequestsService,
              private contentService: ContentService,
              private subRegionsSrv: SubRegionService,
              private auth: AuthService,
              private router: Router) {
    this.form = this.fb.group({
      organization: [auth.getUserOrganization(), Validators.required],
      title: ['', Validators.required],
      about: ['', Validators.required],
      availableContent: [''],
      multiOccurrence: [false],
      poc: this.fb.group({
        name: [auth.getUserName(), Validators.required],
        phone: ['', Validators.required],
        email: [auth.getUserEmail(), [Validators.required, Validators.email]],
      }),
      regions: [[auth.getUserLocation()]],
    });
  }

  async ngOnInit() {
    this.content = await this.contentService.getAll({ title: true });
      this.subRegionsSrv.getAll().then(subregions_res => {
      this.subRegions = subregions_res;
    });
    this.contentService.getAll().then(content_res => {
      this.contentList = content_res;
    });
  }

  sendData() {
    if (!this.form.valid) {
      return;
    }
    const formValues = this.form.value;
    const volunteeringRequest: VolunteeringRequest = this.formValues2volunteeringRequestModel(formValues);

    this.vltrReq.create(volunteeringRequest).then(volunteeringRequestDocument => {
      if (volunteeringRequestDocument) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  formValues2volunteeringRequestModel(formValues): VolunteeringRequest {
    const volunteeringRequest: VolunteeringRequest = {} as any;

    volunteeringRequest.organization = formValues.organization;
    volunteeringRequest.title = formValues.title;
    volunteeringRequest.about = formValues.about;
    volunteeringRequest.contact = formValues.poc;
    volunteeringRequest.content = formValues.availableContent;
    volunteeringRequest.multiOccurrence = formValues.multiOccurrence;
    volunteeringRequest.regions = formValues.regions;
    volunteeringRequest.createdByUserId = this.auth.getUserId();

    return volunteeringRequest;
  }

 onContentTitleLoaded(changedContent: ContentModel) {
    this.contentList = [...this.contentList, changedContent];
    this.form.patchValue({
      availableContent: changedContent._id
    });
  }

  groupByRegion(regionItem: SubRegionsModel) {
   return regionItem.region.name;
  }

  openContentModal() {
    $('#modalContentUpload').modal('toggle');
  }
}
