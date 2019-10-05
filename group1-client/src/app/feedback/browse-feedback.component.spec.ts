import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseFeedbackComponent } from './browse-feedback.component';

describe('BrowseFeedbackComponent', () => {
  let component: BrowseFeedbackComponent;
  let fixture: ComponentFixture<BrowseFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
