import { BeckendHttpService } from './beckend-http.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

export abstract class BackendModelService<BasicModel, BackendModel extends BasicModel> {

  static getUrlWithId(path: string, id: string): string {
    return `${path}/${id}`;
  }

  protected constructor(protected path: string,
                        protected beckendHttpService: BeckendHttpService) {
  }

  async getAll(): Promise<BackendModel[]> {
    try {
      return await this.beckendHttpService.get(this.path);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

  async getById(id: string): Promise<BackendModel> {
    try {
      return await this.beckendHttpService.get(BackendModelService.getUrlWithId(this.path, id));
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

  async create(toCreate: BasicModel): Promise<BackendModel> {
    try {
      return await this.beckendHttpService.post(this.path, toCreate);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

  async update(id: string, toUpdate: BasicModel): Promise<BackendModel> {
    try {
      return await this.beckendHttpService.put(BackendModelService.getUrlWithId(this.path, id), toUpdate);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

  async delete(id: string): Promise<BackendModel> {
    try {
      return await this.beckendHttpService.delete(BackendModelService.getUrlWithId(this.path, id));
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }
}
