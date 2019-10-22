import { Injectable } from '@angular/core';

import {IRecipe} from '../shared/recipe'
import demodata from 'src/assets/mock_recipes.json';
import { Observable, of } from 'rxjs';
//import { MessageService } from '../message.service';


@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  //constructor(private messageService: MessageService) { }
  constructor() { }

 getRecipes(): Observable<IRecipe[]> {
  // TODO: send the message _after_ fetching the heroes
  //this.messageService.add('CatalogService: fetched recipes');
  return of(demodata);
}
getRecipe(_id: number): Observable<IRecipe> {
  // TODO: send the message _after_ fetching the hero
  //this.messageService.add(`CatalogService: fetched recipe id=${_id}`);
  return of(demodata.find(recipe => recipe._id === _id));
}
}
