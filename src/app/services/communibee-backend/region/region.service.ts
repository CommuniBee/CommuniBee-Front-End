import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';
import { BeckendHttpService } from '../beckend-http.service';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private readonly path: string;

  constructor(private beckendHttpService: BeckendHttpService) {
    this.path = 'regions';
  }

  async getAll(): Promise<string[]> {
    try {
      return await this.beckendHttpService.get(this.path);
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }
}
