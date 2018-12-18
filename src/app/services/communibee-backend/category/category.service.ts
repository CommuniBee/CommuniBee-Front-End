import { Injectable } from '@angular/core';
import { BeckendModelService } from '../basic-model.service';
import { Category, CategoryModel } from './category';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';
import { BeckendHttpService } from '../beckend-http.service';

const path = 'categories';
@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BeckendModelService<Category, CategoryModel> {

  constructor(private communiHttp: BeckendHttpService, private errorHandlerService: ErrorHandlerService) {
    super(path, communiHttp, errorHandlerService);
  }
}
