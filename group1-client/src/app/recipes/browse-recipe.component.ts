import { Component, OnInit } from '@angular/core';
import {RecipeService} from './recipe.service';

// imports for authentication 
import{Subscription} from 'rxjs';
import{first} from 'rxjs/operators';
import {User} from '../_models';
import {UserService,AuthenticationService} from '../_services';
// imports for authentication end 
import {AlertService} from '../_services';


@Component({
  selector: 'app-browse-recipe',
  templateUrl: './browse-recipe.component.html',
  styleUrls: ['./browse-recipe.component.css']
})
export class BrowseRecipeComponent implements OnInit {

  public Recipes 

  // authentication start
  myUserId = '' /* Start with default value. Once we grab the authentuicated user, it will be replaced */
  currentUser:User;
  currentUserSubscription:Subscription;
//authentication end

  constructor(private _myService: RecipeService,
    private alertService:AlertService,
    // authentication start
    private authenticationService:AuthenticationService
     ) { 
   
       this.currentUserSubscription=this.authenticationService.currentUser.subscribe(
       user =>{
         this.currentUser=user;
       });
       if (this.currentUser ) {
         this.myUserId = this.currentUser.username
       }
     
     } // authentication end)
  
  ngOnInit() {
  
  this.getRecipes();
  
  }
  getRecipes() {

    this._myService.getRecipesByUser(this.myUserId).subscribe(
    
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
