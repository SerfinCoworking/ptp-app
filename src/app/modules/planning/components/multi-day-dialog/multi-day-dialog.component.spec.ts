import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDayDialogComponent } from './multi-day-dialog.component';

describe('MultiDayDialogComponent', () => {
  let component: MultiDayDialogComponent;
  let fixture: ComponentFixture<MultiDayDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiDayDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
