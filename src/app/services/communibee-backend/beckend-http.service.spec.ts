import { TestBed } from '@angular/core/testing';

import { BeckendHttpService } from './beckend-http.service';

describe('BeckendHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeckendHttpService = TestBed.get(BeckendHttpService);
    expect(service).toBeTruthy();
  });
});
