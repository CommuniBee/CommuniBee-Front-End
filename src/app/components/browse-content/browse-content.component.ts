import { Component, OnInit } from '@angular/core';
import {ContentModel} from '../../services/communibee-backend/content/content';
import {ContentService} from '../../services/communibee-backend/content/content.service';
import {CategoryService} from '../../services/communibee-backend/category/category.service';
import {CategoryModel} from '../../services/communibee-backend/category/category';
import {ArrBuff} from '../../services/utils/arr-buff.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-browse-content',
  templateUrl: './browse-content.component.html',
  styleUrls: ['./browse-content.component.scss']
})
export class BrowseContentComponent implements OnInit {
  contents: ContentModel[] = [] as any;
  cloneContetns: ContentModel[] = [] as any;
  categories: CategoryModel[] = [] as any;
  title: string;
  category_filter: any;
  description: any;


  constructor(private categoriesSrv: CategoryService,
    private contentSrv: ContentService) {
   }

  ngOnInit() {
      this.contentSrv.getAll().then(contents_res => {
      this.contents = contents_res as any;
      this.cloneContetns = this.contents.slice(0);
    });
    this.categoriesSrv.getAll().then( categories_res => {
      this.categories = categories_res;
    });
  }

  handleClick() {
    let isCatalogByFilter = true;
    let isTitleFilter = true;
    let isMarked = false;
    let isDescFilter = true;


    if (this.category_filter == null || this.category_filter === '-1') {
        isCatalogByFilter = false;
    }

    if (this.description == null || this.description.trim() === '') {
        isDescFilter = false;
    }


    if (this.title == null || this.title.trim() === '') {
        isTitleFilter = false;
    }

    if ((!isTitleFilter) && (!isCatalogByFilter) && (!isDescFilter)) {
        this.contents = this.cloneContetns;
    } else {
        this.contents = [];
        this.cloneContetns.forEach(content => {
            isMarked = false;
            if (isTitleFilter) {
                isMarked = content.title.includes(this.title);
                if (isCatalogByFilter && isMarked) {
                    isMarked = content.category._id === this.category_filter;
                }
                if (isDescFilter && isMarked) {
                    isMarked = content.information.includes(this.description);
                }
            } else if (isCatalogByFilter) {
                isMarked =  content.category._id === this.category_filter;
                if (isDescFilter && isMarked) {
                    isMarked = content.information.includes(this.description);
                }
            } else if (isDescFilter) {
                isMarked = content.information.includes(this.description);
            }
            if (isMarked) {
                this.contents.push(content);
            }
        });
    }

  }

  async openFile(id, fileName: string) {
      const fileData = await this.contentSrv.getFile(id);
      const data = ArrBuff.base64ToArrayBuffer(fileData.file);
      const type = fileName.substring(fileName.lastIndexOf('.') + 1);
      let fileBlob;
      switch (type) {
        case 'pdf':
            fileBlob = new Blob([data], { type: 'application/pdf' });
            break;
        case 'doc':
            fileBlob = new Blob([data], { type: 'application/msword' });
            break;
        case 'docx':
            fileBlob = new Blob([data],
                { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            break;
        case 'ppt':
            fileBlob = new Blob([data],
                { type: 'application/vnd.ms-powerpoint' });
            break;
        case 'pptx':
            fileBlob = new Blob( [data],
            { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
            break;
        case 'txt':
            fileBlob = new Blob([data], { type: 'text/plain'} );
            break;
        default:
            fileBlob = '';
      }
      if ( fileBlob !== '' ) {
        console.log('saving...');
        saveAs(fileBlob, fileName);
      }
  }
}
