import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
    //we know that response will be in JSON format
const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

 @Injectable()
    export class GroceryService {
        constructor(private http:HttpClient) {}
    // Uses http.get() to load data 
        getGroceries() {
            return this.http.get('http://localhost:8000/groceries');
        }
        createGroceryList(ingredient: string, quantity: string) {
            this.http.post('http://localhost:8000/groceries',{ ingredient, quantity })
          .subscribe((responseData) => {
             console.log(responseData);
           }); 
    }
    
    }