import { Injectable } from '@angular/core';
import { BeckendModelService } from '../basic-model.service';
import { Content, ContentModel } from './content';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';
import { BeckendHttpService } from '../beckend-http.service';

const path = 'contents';

@Injectable({
  providedIn: 'root',
})
export class ContentService extends BeckendModelService<Content, ContentModel> {

  constructor(private communiHttp: BeckendHttpService, private errorHandlerService: ErrorHandlerService) {
    super(path, communiHttp, errorHandlerService);
  }
}
