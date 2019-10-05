import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRecipeComponent } from './browse-recipe.component';

describe('BrowseRecipeComponent', () => {
  let component: BrowseRecipeComponent;
  let fixture: ComponentFixture<BrowseRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
