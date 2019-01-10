import { TestBed } from '@angular/core/testing';

import { ContentService } from './content.service';

describe('ContentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentService = TestBed.get(ContentService);
    expect(service).toBeTruthy();
  });
});
