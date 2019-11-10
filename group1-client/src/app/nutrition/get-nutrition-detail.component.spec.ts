import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNutritionDetailComponent } from './get-nutrition-detail.component';

describe('GetNutritionDetailComponent', () => {
  let component: GetNutritionDetailComponent;
  let fixture: ComponentFixture<GetNutritionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetNutritionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetNutritionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
