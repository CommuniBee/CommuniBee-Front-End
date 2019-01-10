import { TestBed } from '@angular/core/testing';

import { VolunteeringRequestsService } from './volunteering-requests.service';

describe('VolunteeringRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolunteeringRequestsService = TestBed.get(VolunteeringRequestsService);
    expect(service).toBeTruthy();
  });
});
