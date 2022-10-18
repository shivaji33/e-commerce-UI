import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutStepsComponent } from './check-out-steps.component';

describe('CheckOutStepsComponent', () => {
  let component: CheckOutStepsComponent;
  let fixture: ComponentFixture<CheckOutStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOutStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
