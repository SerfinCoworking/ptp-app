import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLiquidationComponent } from './staff-liquidation.component';

describe('StaffLiquidationComponent', () => {
  let component: StaffLiquidationComponent;
  let fixture: ComponentFixture<StaffLiquidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffLiquidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffLiquidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
