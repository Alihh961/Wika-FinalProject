import { TestBed } from '@angular/core/testing';

import { ETHService } from './eth.service';

describe('ETHService', () => {
  let service: ETHService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ETHService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
