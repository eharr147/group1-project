import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router'
import { CatalogService } from './catalog.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

// imports for authentication 
import{Subscription} from 'rxjs';
import{first} from 'rxjs/operators';
import {User} from '../_models';
import {UserService,AuthenticationService} from '../_services';
// imports for authentication end 


@Component({
  selector: 'app-view-catalog',
  templateUrl: './view-catalog.component.html',
  styleUrls: ['./view-catalog.component.css']
})
export class ViewCatalogComponent implements OnInit {

  recipe_id = "" 

  public recipe

  // authentication start
myUserId = '' /* Start with default value. Once we grab the authentuicated user, it will be replaced */
currentUser:User;
currentUserSubscription:Subscription;
//authentication end


  constructor(private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService,
    private location: Location,
    private router: Router,
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
    
    } // authentication end

  ngOnInit() {

    /* Check if component was called in Edit mode */

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap ) => {
      this.recipe_id = paramMap.get('_id');})

    this.getRecipe(this.recipe_id ) // Load data for desired schedule
  }

  getRecipe(recipe_id: string): void {
    /* Initialize recipe property */
    this.catalogService.getRecipe(recipe_id)
        .subscribe(recipe => this.recipe = recipe);

  }
  goBack() {
    this.location.back()
  }

  addFeedback(recipeId, recipeTitle) {
    this.router.navigate(['feedback-create/'+ recipeId + '/' + recipeTitle] )
  }

}