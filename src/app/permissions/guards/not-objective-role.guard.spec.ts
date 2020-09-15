import { TestBed } from '@angular/core/testing';

import { NotObjectiveRoleGuard } from './not-objective-role.guard';

describe('NotObjectiveRoleGuard', () => {
  let guard: NotObjectiveRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotObjectiveRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
