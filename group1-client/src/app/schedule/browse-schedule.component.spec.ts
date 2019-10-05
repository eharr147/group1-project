import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseScheduleComponent } from './browse-schedule.component';

describe('BrowseScheduleComponent', () => {
  let component: BrowseScheduleComponent;
  let fixture: ComponentFixture<BrowseScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
