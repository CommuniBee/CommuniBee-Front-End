import { TestBed } from '@angular/core/testing';

import { VolunteeringOffersService } from './volunteering-offers.service';

describe('VolunteeringOffersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolunteeringOffersService = TestBed.get(VolunteeringOffersService);
    expect(service).toBeTruthy();
  });
});
