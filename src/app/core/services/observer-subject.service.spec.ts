import { TestBed } from '@angular/core/testing';

import { ObserverSubjectService } from './observer-subject.service';

describe('ObserverSubjectService', () => {
  let service: ObserverSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObserverSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
