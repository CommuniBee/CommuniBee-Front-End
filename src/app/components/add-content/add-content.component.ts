import {Component, OnInit, ViewChild, ElementRef, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/communibee-backend/category/category.service';
import {CategoryModel} from '../../services/communibee-backend/category/category';
import {ContentModel} from '../../services/communibee-backend/content/content';
import {ContentService} from '../../services/communibee-backend/content/content.service';
import {ArrBuff} from '../../services/utils/arr-buff.service';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss'],
})
export class AddContentComponent implements OnInit {
  public addContentForm: FormGroup;
  categories: CategoryModel[] = [];
  content: ContentModel = {} as any;
  isFileSelected = false;
  fileErrorSize = false;
  contentResult: ContentModel = {} as any;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @Output() contentTitleLoaded = new EventEmitter<string>();

  constructor(private fb: FormBuilder,
              private categoriesSrv: CategoryService,
              private contentSrv: ContentService) {
    this.initForm();
  }

  ngOnInit() {
    this.categoriesSrv.getAll().then(categories_res => {
      this.categories = categories_res;
    });
  }

  initForm() {
    this.addContentForm = this.fb.group({
      title: ['', Validators.required],
      information: ['', [Validators.required,
        Validators.maxLength(200)]],
      category: ['', Validators.required],
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
    this.contentSrv.create(this.content).then( contentRes => {
        this.contentResult = contentRes;
        this.contentTitleLoaded.emit(this.contentResult.title);
    });
    this.isFileSelected = false;
    this.addContentForm.reset();
    this.closeBtn.nativeElement.click();
  }

}
