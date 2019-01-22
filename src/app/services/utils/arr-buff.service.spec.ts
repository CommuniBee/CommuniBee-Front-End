import { TestBed } from '@angular/core/testing';

import { ArrBuffService } from './arr-buff.service';

describe('ArrBuffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArrBuffService = TestBed.get(ArrBuffService);
    expect(service).toBeTruthy();
  });
});
