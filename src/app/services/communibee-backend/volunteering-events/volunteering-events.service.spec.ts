import { TestBed } from '@angular/core/testing';

import { VolunteeringEventsService } from './volunteering-events.service';

describe('VolunteeringEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolunteeringEventsService = TestBed.get(VolunteeringEventsService);
    expect(service).toBeTruthy();
  });
});
