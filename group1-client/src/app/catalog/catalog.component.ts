import { Component, OnInit } from '@angular/core';
import { IRecipe } from './recipe';
import { CatalogService } from './catalog.service';
import { QueueService} from './queue.service'
import { Router, ActivatedRoute,ParamMap} from '@angular/router'
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

// imports for authentication 
import{Subscription} from 'rxjs';
import{first} from 'rxjs/operators';
import {User} from '../_models';
import {UserService,AuthenticationService} from '../_services';
// imports for authentication end 


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})

export class CatalogComponent implements OnInit {
  title = 'Recipe Catalog'
 
 
  public recipes;
  public filteredRecipes;
  private _return: string = null
  
  public showBackButton = false // Flag to control oage exit buttons
  
  // authentication start
  myUserId = '' /* Start with default value. Once we grab the authentuicated user, it will be replaced */
  currentUser:User;
  currentUserSubscription:Subscription;
//authentication end

  constructor(private catalogService: CatalogService,
    public queueService: QueueService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
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

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap ) => {
      this._return = paramMap.get('_return');

});
    console.log('catalog.component return parameter = ' + this._return)
    if (this._return == null) {
       // When Catalog is called directly from Navigation or Home Page, we clear all selectetion from cache
       this.queueService.clear()
    } 

    if (this.queueService.schedule != null) {
      // component was called from Schedule page and state is saved
      this.showBackButton=true} 
    this.getRecipes();
  }


  getRecipes(): void {
    /* Initialize recipes property */
    this.catalogService.getRecipes()
        .subscribe(recipes => this.recipes = recipes);
    /* Initialize filteredRecipes property so template renders first time */
    this.catalogService.getRecipes()
        .subscribe(recipes => this.filteredRecipes = recipes);
  }

  addSelection(_id: number) {
 
    var toSelect = (this.recipes.findIndex(c => c._id == _id));
    this.queueService.add(this.recipes[toSelect]
                  )
  }

  viewSelection(_id: number) {
    this.router.navigate(['catalog-view/'+ _id] )
  }


  addFeedback(recipeId, recipeTitle) {
    this.router.navigate(['feedback-create/'+ recipeId + '/' + recipeTitle] )
  }

  addSelectionAndNew(_id: number) {
   this.addSelection(_id) 
   this.router.navigate(['/schedule-create'])
  }
  
  addSelectionAndFinish(_id: number) {
    this.addSelection(_id) 
    this.location.back()
   }
   
  removeSelection(selIndex: number): void {
    this.queueService.remove(selIndex)
    //this.selectedRecipes.splice(selIndex);
  }
   goSchedule() {
    this.router.navigate(['/schedule-create'])
   }
   goScheduleBrowse() {
    this.router.navigate(['/schedule-browse'])
   }
   goBack() {
     this.location.back()
   }


    /* Filter implementation: create a property to hold the search string, with getter and setter methods */

    _listFilter: string

    get listFilter(): string {
        return this._listFilter;

    }

    set listFilter(value: string)  {
        this._listFilter = value; /* property setter */
        /* Additional code ~ in this case, filter the array of products */
       this.filteredRecipes = this.listFilter ? this.performFilter(this.listFilter) : this.recipes; 
   
    }

    /* Actual array filter code ~ defined in performFilter method */
    performFilter(filterBy: string): IRecipe[] {
        filterBy = filterBy.toLowerCase();
        return this.recipes.filter((recipe: IRecipe) => 
            recipe.name.toLocaleLowerCase().indexOf(filterBy) !== -1)

      
    }

}
