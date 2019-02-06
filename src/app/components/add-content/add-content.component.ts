import {Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, DoCheck} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/communibee-backend/category/category.service';
import {CategoryModel} from '../../services/communibee-backend/category/category';
import {ContentModel} from '../../services/communibee-backend/content/content';
import {ContentService} from '../../services/communibee-backend/content/content.service';
import {ArrBuff} from '../../services/utils/arr-buff.service';
import { AuthService } from '../../services/communibee-backend/auth/auth.service';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss'],
})
export class AddContentComponent implements OnInit, DoCheck {
  public addContentForm: FormGroup;
  categories: CategoryModel[] = [];
  content: ContentModel = {} as any;
  isFileSelected = false;
  fileErrorSize = false;
  isAfterLogin = false;
  contentResult: ContentModel = {} as any;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('fileBrowserLabel') fileLabel: ElementRef;
  @Output() contentTitleLoaded = new EventEmitter<ContentModel>();

  constructor(private fb: FormBuilder,
              private categoriesSrv: CategoryService,
              private contentSrv: ContentService,
              private auth: AuthService) {
    this.initForm();
  }

  ngOnInit() {
    this.categoriesSrv.getAll().then(categories_res => {
      this.categories = categories_res;
    });
    this.initForm();
  }

  initForm() {
    this.addContentForm = this.fb.group({
      organization: ['', Validators.required],
      title: ['', Validators.required],
      information: ['', [Validators.required,
        Validators.maxLength(200)]],
      category: ['', Validators.required],
      poc: this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }),
    });
  }

  onFileChange(event) {
    const fileSize = event.srcElement.files[0].size;
    const maxFileSize = 1.048576e7; // 5MB

    this.fileErrorSize = false;
    if (fileSize > maxFileSize) {
        this.fileErrorSize = true;
    } else {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.onload = () => {
          this.content.file = ArrBuff.arrayBufferToBase64(reader.result);
          this.content.fileName = file.name;
          this.fileLabel.nativeElement.innerHTML = file.name;
          this.isFileSelected = true;
        };
        reader.readAsArrayBuffer(file);
      }
    }
  }

  uploadContent() {
    this.content.organization = this.addContentForm.controls['organization'].value;
    this.content.title = this.addContentForm.controls['title'].value;
    this.content.information = this.addContentForm.controls['information'].value;
    this.content.category = this.addContentForm.controls['category'].value;
    this.content.contact = this.addContentForm.controls['poc'].value;
    this.contentSrv.create(this.content).then( contentRes => {
        this.contentResult = contentRes;
        this.contentTitleLoaded.emit(contentRes);
    });
    this.isFileSelected = false;
    this.addContentForm.reset();
    this.closeBtn.nativeElement.click();
  }

  isFormValid() {
      return this.addContentForm.valid && this.isFileSelected;
  }

  ngDoCheck() {
    if ( this.auth.isAuthenticated() && !this.isAfterLogin ) {
        this.addContentForm = this.fb.group({
            organization: [this.auth.getUserOrganization(), Validators.required],
            title: ['', Validators.required],
            information: ['', [Validators.required,
                Validators.maxLength(200)]],
            category: ['', Validators.required],
            poc: this.fb.group({
                name: [this.auth.getUserName(), Validators.required],
                phone: ['', Validators.required],
                email: [this.auth.getUserEmail(), [Validators.required, Validators.email]],
            }),
        });
        this.isAfterLogin = true;
    }
  }

}
