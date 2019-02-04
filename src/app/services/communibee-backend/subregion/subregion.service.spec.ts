import { TestBed } from '@angular/core/testing';

import { SubRegionService } from './subregion.service';

describe('SubRegionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubRegionService = TestBed.get(SubRegionService);
    expect(service).toBeTruthy();
  });
});
