import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StaffListComponent } from './staff-list.component';

describe('StaffListComponent', () => {
  let component: StaffListComponent;
  let fixture: ComponentFixture<StaffListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
