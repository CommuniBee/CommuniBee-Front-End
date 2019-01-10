import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';
import { BackendHttpService } from '../backend-http.service';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private readonly path: string;

  constructor(private backendHttpService: BackendHttpService) {
    this.path = 'regions';
  }

  async getAll(): Promise<string[]> {
    try {
      return await this.backendHttpService.get(this.path);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }
}
