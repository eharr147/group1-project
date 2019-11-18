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
            return this.http.get('http://localhost:8000/groceries/');
          //  location.reload();
        }
        createGroceryList(userId: string, ingredient: string, quantity: string,unit:string) {  
          console.log('createGroceryList called')         
           return this.http.post('http://localhost:8000/groceries/create/',{ userId, ingredient, quantity,unit })

        } 
        
        getGroceriesByUser(userId) {
          return this.http.get('http://localhost:8000/groceries/user/' + userId);
      }
      
        deleteGrocery(id: string) {        
          console.log('deleteGrocery called')
        this.http.delete("http://localhost:8000/groceries/delete/"+id)
          .subscribe(() => {   
              console.log('Deleted: ' + id);
          });  
          location.reload();                 
        }
        editGroceryList(id:string,ingredient: string, quantity: string,unit:string){
        console.log('editGroceryList called')
        return this.http.put("http://localhost:8000/groceries/edit/"+id,{ ingredient, quantity,unit })

         
        }
        editItem(_id: string) {   
          console.log('editItem called')        
            return this.http.get("http://localhost:8000/groceries/item/" + _id);
          }
    }
   