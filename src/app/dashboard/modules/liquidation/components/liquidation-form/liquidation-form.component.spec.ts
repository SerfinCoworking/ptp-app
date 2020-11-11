import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationFormComponent } from './liquidation-form.component';

describe('LiquidationFormComponent', () => {
  let component: LiquidationFormComponent;
  let fixture: ComponentFixture<LiquidationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
