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
        getGroceriesId(id : string) {           
            return this.http.get('http://localhost:8000/groceries/'+id);
               
        }
        createGroceryList(ingredient: string, quantity: string) {
            this.http.post('http://localhost:8000/groceries',{ ingredient, quantity })
          .subscribe((responseData) => {
             console.log(responseData);
           }); 
           location.reload();
    }
    deleteGrocery(id: string) {
        console.log('About to Delete: ' + id);
        this.http.delete("http://localhost:8000/groceries/"+id)
          .subscribe(() => {   
              console.log('Deleted: ' + id);
          });  
          location.reload();        
        }
    editGroceryList(id: string,ingredient: string, quantity: string) {  
        this.http.put("http://localhost:8000/groceries/"+ id,{ ingredient, quantity })
          .subscribe(() => {   
              console.log('Updated: ' + id);    
            });    
              location.reload();   
        } 
    }