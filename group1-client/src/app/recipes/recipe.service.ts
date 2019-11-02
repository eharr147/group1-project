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

   // Uses http.post() to post data 
  addRecipes(name: string, description: string, cuisine: string,
    usage, effort_lvl, contributor, servings, calories
    /* arrays */
    ,ingredients, steps      
    ) {
    this.http.post('http://localhost:8000/recipe/add',
    { name, description,cuisine, usage, effort_lvl, contributor, servings, calories
  ,ingredients, steps    })
  .subscribe((responseData) => {
     console.log(responseData);
   }); 
}
}