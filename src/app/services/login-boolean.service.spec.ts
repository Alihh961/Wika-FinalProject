import { TestBed } from '@angular/core/testing';

import { LoginBooleanService } from './login-boolean.service';

describe('LoginBooleanService', () => {
  let service: LoginBooleanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginBooleanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
