import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/communibee-backend/auth/auth.service';
import { User } from '../../services/communibee-backend/user/user';
import { CategoryService } from '../../services/communibee-backend/category/category.service';
import { ArrBuff } from '../../services/utils/arr-buff.service';
import { ContentModel } from '../../services/communibee-backend/content/content';
import { ContentService } from '../../services/communibee-backend/content/content.service';

declare var $;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  fileError = '';
  categories = [];
  content: ContentModel = {} as any;

  constructor(public auth: AuthService, private categoriesSrv: CategoryService, private contentSrv: ContentService) {
  }

  ngOnInit() {
    this.categoriesSrv.getAll().then(categories_res => {
      this.categories = categories_res;
    });
  }

  getLocalUserName(): string {
    const localUser: User = this.auth.getLocalUser();
    return (localUser && localUser.name) ? localUser.name : 'NO_NAME_ERROR';
  }

  getHomePath() {
    const DASHBOARD_PATH = '/dashboard';
    const HOME_PATH = '/';
    return this.auth.isLoggedIn() ? DASHBOARD_PATH : HOME_PATH;
  }

  openContentModal() {
    $('#navModalContentUpload').modal('toggle');
  }

  onFileChange(event) {
    const fileSize = event.srcElement.files[0].size;
    if (fileSize > 5e+6) {
      this.fileError = 'File size is bigger then 5mb';
    } else {
      this.fileError = '';
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsArrayBuffer(file);

        reader.onload = () => {
          $('#navFileBrowserLabel').html(file.name);
          const base64File = ArrBuff.arrayBufferToBase64(reader.result);

          this.content.title = $('#navContentTitle').val();
          this.content.file = base64File;
          this.content.category = $('#navContentCategory').val();
          this.content.fileName = file.name;

        };
      }
    }
  }

  uploadContent() {
    this.contentSrv.create(this.content).then(contentRes => {
      console.log(contentRes);
      this.content = contentRes;
    });
  }

}
