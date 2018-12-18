import { Injectable } from '@angular/core';
import { BackendModelService } from '../basic-model.service';
import { Content, ContentModel } from './content';
import { BeckendHttpService } from '../beckend-http.service';

const path = 'contents';

@Injectable({
  providedIn: 'root',
})
export class ContentService extends BackendModelService<Content, ContentModel> {

  constructor(private communiHttp: BeckendHttpService) {
    super(path, communiHttp);
  }
}
