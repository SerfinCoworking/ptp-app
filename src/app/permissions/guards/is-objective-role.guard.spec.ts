import { TestBed } from '@angular/core/testing';

import { IsObjectiveRoleGuard } from './is-objective-role.guard';

describe('IsObjectiveRoleGuard', () => {
  let guard: IsObjectiveRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsObjectiveRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
