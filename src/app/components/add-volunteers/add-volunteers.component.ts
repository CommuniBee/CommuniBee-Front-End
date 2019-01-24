import {Component, OnInit} from '@angular/core';
import {RegionService} from '../../services/communibee-backend/region/region.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/communibee-backend/auth/auth.service';
import {VolunteeringOffersService} from '../../services/communibee-backend/volunteering-offers/volunteering-offers.service';
import {VolunteeringOffer} from '../../services/communibee-backend/volunteering-offers/volunteering-offer';
import {CategoryService} from '../../services/communibee-backend/category/category.service';
import {CategoryModel} from '../../services/communibee-backend/category/category';
import {ContentModel} from '../../services/communibee-backend/content/content';
import {ContentService} from '../../services/communibee-backend/content/content.service';
import {ArrBuff} from '../../services/utils/arr-buff.service';

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
              private router: Router,
              private categoriesSrv: CategoryService,
              private contentSrv: ContentService) {
    this.initForm();
    categoriesSrv.getAll().then(categories_res => {
      this.categories = categories_res;
    });
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
        email: ['', Validators.required],
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

  daysCheckboxsToArray(days): [number] {
    const availableWeekdays: [number] = [] as any;
    if (days['1']) {
      availableWeekdays.push(1);
    }
    if (days['2']) {
      availableWeekdays.push(2);
    }
    if (days['3']) {
      availableWeekdays.push(3);
    }
    if (days['4']) {
      availableWeekdays.push(4);
    }
    if (days['5']) {
      availableWeekdays.push(5);
    }
    if (days['6']) {
      availableWeekdays.push(6);
    }
    if (days['7']) {
      availableWeekdays.push(7);
    }

    return availableWeekdays;
  }

  openContentModal() {
    $('#modalContentUpload').modal('toggle');
  }

  onFileChange(event) {
    const fileSize = event.srcElement.files[0].size;
    const maxFileSize = 5e+6; // 5MB

    if (fileSize > maxFileSize) {
        this.myForm.patchValue({
        availableContent: 'File size is bigger then 5mb',
      });
    } else {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsArrayBuffer(file);

        reader.onload = () => {
          this.content.file = ArrBuff.arrayBufferToBase64(reader.result);
          this.content.fileName = file.name;
          this.isFileSelected = true;
        };
      }
    }
  }

  uploadContent() {
    this.content.title = this.contentTitle;
    this.content.category = this.contentCategory;
    this.content.information = this.information;
    this.myForm.patchValue({
      availableContent: `${this.content.title}`,
    });
    this.contentSrv.create(this.content).then( contentRes => {
        this.content = contentRes;
    });
  }

}
