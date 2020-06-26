import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveShowComponent } from './objective-show.component';

describe('ObjectiveShowComponent', () => {
  let component: ObjectiveShowComponent;
  let fixture: ComponentFixture<ObjectiveShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
