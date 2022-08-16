import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedItemComponent } from './rounded-item.component';

describe('RoundedItemComponent', () => {
  let component: RoundedItemComponent;
  let fixture: ComponentFixture<RoundedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundedItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
