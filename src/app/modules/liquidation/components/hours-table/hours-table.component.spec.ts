import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HoursTableComponent } from './hours-table.component';

describe('HoursTableComponent', () => {
  let component: HoursTableComponent;
  let fixture: ComponentFixture<HoursTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HoursTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
