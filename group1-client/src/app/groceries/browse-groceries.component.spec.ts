import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseGroceriesComponent } from './browse-groceries.component';

describe('BrowseGroceriesComponent', () => {
  let component: BrowseGroceriesComponent;
  let fixture: ComponentFixture<BrowseGroceriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseGroceriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseGroceriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
