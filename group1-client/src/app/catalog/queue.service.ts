import { Injectable } from '@angular/core';
import { IRecipe } from '../shared/recipe';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  recipes: IRecipe[] = [];

  add(recipe: IRecipe) {
    this.recipes.push(recipe);
  }

  clear() {
    this.recipes = [];
  }

  remove(selIndex: number): void {
    this.recipes.splice(selIndex,1);
  }

}
