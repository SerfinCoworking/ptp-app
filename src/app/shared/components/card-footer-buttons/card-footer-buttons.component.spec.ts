import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardFooterButtonsComponent } from './card-footer-buttons.component';

describe('CardFooterButtonsComponent', () => {
  let component: CardFooterButtonsComponent;
  let fixture: ComponentFixture<CardFooterButtonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFooterButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFooterButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
