import { Injectable } from '@angular/core';
import { BackendModelService } from '../basic-model.service';
import { Content, ContentModel, ContentFile } from './content';
import { BackendHttpService } from '../backend-http.service';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';

const path = 'contents';

@Injectable({
  providedIn: 'root',
})
export class ContentService extends BackendModelService<Content, ContentModel> {

  constructor(private backendHttpService: BackendHttpService) {
    super(path, backendHttpService);
  }

  async getFile(contentId: string) {
    try {
      return await this.backendHttp.get(`${path}/${contentId}/file`);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

}
