import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseVolunteersComponent } from './browse-volunteers.component';

describe('BrowseVolunteersComponent', () => {
  let component: BrowseVolunteersComponent;
  let fixture: ComponentFixture<BrowseVolunteersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseVolunteersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
