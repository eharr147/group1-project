import { Injectable } from '@angular/core';

import {IRecipe} from './recipe' // Manipulate Recipes in standard format
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import { MessageService } from '../message.service';

//we know that response will be in JSON format
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http:HttpClient) { }

  // Uses http.get() to load data 
  getRecipes() {
    return this.http.get('http://localhost:8000/catalog');
}


getRecipe(_id: string) {
  console.log('catalog.service.getRecipe - _id = ' + _id);
  return this.http.get("http://localhost:8000/catalog/" + _id);
}

}
