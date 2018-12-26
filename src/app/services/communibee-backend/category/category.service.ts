import { Injectable } from '@angular/core';
import { BackendModelService } from '../basic-model.service';
import { Category, CategoryModel } from './category';
import { BackendHttpService } from '../backend-http.service';

const path = 'categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BackendModelService<Category, CategoryModel> {

  constructor(private backendHttpService: BackendHttpService) {
    super(path, backendHttpService);
  }
}
