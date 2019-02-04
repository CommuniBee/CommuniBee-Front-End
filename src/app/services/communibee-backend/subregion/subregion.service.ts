import { Injectable } from '@angular/core';
import { BackendHttpService } from '../backend-http.service';
import { SubRegions, SubRegionsModel } from './subregion';
import { BackendModelService } from '../basic-model.service';

const path = 'subregions';

@Injectable({
  providedIn: 'root',
})
export class SubRegionService extends BackendModelService<SubRegions, SubRegionsModel> {

  constructor(private backendHttpService: BackendHttpService) {
    super(path, backendHttpService);
  }
}
