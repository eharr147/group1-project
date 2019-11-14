import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//we know that response will be in JSON format

const httpOptions = {

headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};

@Injectable()

export class RecipeService {

constructor(private http:HttpClient) {}

// Uses http.get() to load data

getRecipes() {

return this.http.get('http://localhost:8000/recipes');

}

getRecipesByUser(userId) {
  return this.http.get('http://localhost:8000/recipes/user/' + userId);
}

deleteRecipe(recipeId: string) {
  this.http.delete("http://localhost:8000/recipes/" + recipeId)
    .subscribe(() => {
        console.log('Deleted: ' + recipeId);
    });
    location.reload();
}
   // Uses http.post() to post data 
  addRecipes(name: string, description: string, cuisine: string,
    usage, effort_lvl, contributor, servings, calories
    /* arrays */
    ,ingredients, steps      
    ) {
    return this.http.post('http://localhost:8000/recipe/add',
    { name, description,cuisine, usage, effort_lvl, contributor, servings, calories
  ,ingredients, steps    })
 
  }

   updateRecipe(recipeId: string, name: string, description: string, cuisine: string,
    usage, effort_lvl, contributor, servings, calories, ingredients, steps) 
    {
    
        return this.http.put("http://localhost:8000/recipes/" 
             + recipeId,
             { name, description,cuisine, usage, effort_lvl, contributor, servings, calories
              ,ingredients, steps    })

          //location.reload();
    }

}
