import { Component, OnInit } from '@angular/core';
import {RecipeService} from './recipe.service';


@Component({
  selector: 'app-browse-recipe',
  templateUrl: './browse-recipe.component.html',
  styleUrls: ['./browse-recipe.component.css']
})
export class BrowseRecipeComponent implements OnInit {

  public Recipes 
  constructor(private _myService: RecipeService ) { }
  
  ngOnInit() {
  
  this.getRecipes();
  
  }
  getRecipes() {

    this._myService.getRecipes().subscribe(
    
    //read data and assign to public variable students
    
    data => { this.Recipes = data},
    
    err => console.error(err),
    
    () => console.log('finished loading')
    
    );
    
    }
    
    onDelete(recipeId: string) {
      this._myService.deleteRecipe(recipeId);
    } 
}
