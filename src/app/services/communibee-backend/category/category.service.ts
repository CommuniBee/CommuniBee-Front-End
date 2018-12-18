import { Injectable } from '@angular/core';
import { BackendModelService } from '../basic-model.service';
import { Category, CategoryModel } from './category';
import { BeckendHttpService } from '../beckend-http.service';

const path = 'categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BackendModelService<Category, CategoryModel> {

  constructor(private communiHttp: BeckendHttpService) {
    super(path, communiHttp);
  }
}
