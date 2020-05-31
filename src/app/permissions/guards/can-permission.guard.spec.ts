import { TestBed } from '@angular/core/testing';

import { CanPermissionGuard } from './can-permission.guard';

describe('CanPermissionGuard', () => {
  let guard: CanPermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanPermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
