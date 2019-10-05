import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroceriesComponent } from './create-groceries.component';

describe('CreateGroceriesComponent', () => {
  let component: CreateGroceriesComponent;
  let fixture: ComponentFixture<CreateGroceriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGroceriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroceriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
