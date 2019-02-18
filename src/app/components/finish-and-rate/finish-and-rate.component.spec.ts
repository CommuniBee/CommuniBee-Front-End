import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishAndRateComponent } from './finish-and-rate.component';

describe('FinishAndRateComponent', () => {
  let component: FinishAndRateComponent;
  let fixture: ComponentFixture<FinishAndRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishAndRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishAndRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
