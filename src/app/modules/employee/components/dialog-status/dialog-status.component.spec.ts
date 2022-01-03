import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogStatusComponent } from './dialog-status.component';

describe('DialogStatusComponent', () => {
  let component: DialogStatusComponent;
  let fixture: ComponentFixture<DialogStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
