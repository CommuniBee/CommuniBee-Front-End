import { TestBed } from '@angular/core/testing';

import { VolunteeringRequestsService } from './volunteering-events.service';

describe('VolunteeringEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolunteeringRequestsService = TestBed.get(VolunteeringRequestsService);
    expect(service).toBeTruthy();
  });
});
