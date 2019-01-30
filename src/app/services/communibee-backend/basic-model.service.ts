import { BackendHttpService } from './backend-http.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

export abstract class BackendModelService<BasicModel, BackendModel extends BasicModel> {

  protected constructor(protected path: string,
                        protected backendHttp: BackendHttpService) {
  }

  static getUrlWithId(path: string, id: string): string {
    return `${path}/${id}`;
  }

  async getAll(fields?: {[K in keyof BackendModel]?: boolean}): Promise<BackendModel[]> {
    try {
      const query = fields && Object.keys(fields).map(fieldName => `fields=${fieldName}`).join('&');
      return await this.backendHttp.get(this.path, query);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

  async getById(id: string): Promise<BackendModel> {
    try {
      return await this.backendHttp.get(BackendModelService.getUrlWithId(this.path, id));
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

  async create(toCreate: BasicModel): Promise<BackendModel> {
    try {
      return await this.backendHttp.post(this.path, toCreate);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

  async update(id: string, toUpdate: BasicModel): Promise<BackendModel> {
    try {
      return await this.backendHttp.put(BackendModelService.getUrlWithId(this.path, id), toUpdate);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

  async delete(id: string): Promise<BackendModel> {
    try {
      return await this.backendHttp.delete(BackendModelService.getUrlWithId(this.path, id));
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }
}
