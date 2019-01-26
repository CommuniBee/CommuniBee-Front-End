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
  contents: ContentModel[] = [];
  cloneContents: ContentModel[] = [];
  categories: CategoryModel[] = [];
  title: string;
  category_filter: string;
  description: string;
  mimeMap = new Map([['pdf', 'application/pdf'],
    ['doc', 'application/msword'],
    ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ['ppt', 'application/vnd.ms-powerpoint'],
    ['pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    ['txt', 'text/plain']]);

  constructor(private categoriesSrv: CategoryService,
    private contentSrv: ContentService) {
   }

  ngOnInit() {
      this.contentSrv.getAll().then(contents_res => {
      this.contents = contents_res as any;
      this.cloneContents = this.contents.slice(0);
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
        this.contents = this.cloneContents;
    } else {
        this.contents = [];
        this.cloneContents.forEach(content => {
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
      const mime = this.mimeMap.get(type);
      if (mime !== undefined) {
        fileBlob = new Blob([data], {type: mime});
        saveAs(fileBlob, fileName);
      }
  }
}
