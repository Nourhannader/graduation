import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardRedirectGuard } from './guard-redirect.guard';

describe('guardRedirectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardRedirectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
