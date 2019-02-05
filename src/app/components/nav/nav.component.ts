import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/communibee-backend/auth/auth.service';
import { CategoryService } from '../../services/communibee-backend/category/category.service';
import { ContentModel } from '../../services/communibee-backend/content/content';

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

  constructor(public auth: AuthService, private categoriesSrv: CategoryService) {
  }

  ngOnInit() {
    this.categoriesSrv.getAll().then(categories_res => {
      this.categories = categories_res;
    });
  }

  getHomePath() {
    const DASHBOARD_PATH = '/dashboard';
    const HOME_PATH = '/';
    return this.auth.isAuthenticated() ? DASHBOARD_PATH : HOME_PATH;
  }

  openContentModal() {
    $('#navModalContentUpload').modal('toggle');
  }

}
