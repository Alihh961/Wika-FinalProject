import { TestBed } from '@angular/core/testing';

import { InputvalidationsService } from './inputvalidations.service';

describe('InputValidationsServiceService', () => {
  let service: InputvalidationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputvalidationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
