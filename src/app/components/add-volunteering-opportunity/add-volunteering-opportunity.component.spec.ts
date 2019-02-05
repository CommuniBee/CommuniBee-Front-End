import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVolunteeringOpportunityComponent } from './add-volunteering-opportunity.component';

describe('AddVolunteeringOpportunityComponent', () => {
  let component: AddVolunteeringOpportunityComponent;
  let fixture: ComponentFixture<AddVolunteeringOpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVolunteeringOpportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVolunteeringOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
