import { Component, OnInit } from '@angular/core';
import {GroceryService} from './grocery.service';
import { Location } from '@angular/common';

// imports for authentication 
import{Subscription} from 'rxjs';
import{first} from 'rxjs/operators';
import {User} from '../_models';
import {UserService,AuthenticationService} from '../_services';
// imports for authentication end 
import {AlertService} from '../_services';


@Component({
  selector: 'app-browse-groceries',
  templateUrl: './browse-groceries.component.html',
  styleUrls: ['./browse-groceries.component.css']
})
export class BrowseGroceriesComponent implements OnInit {
   
  public groceries;

// authentication start
myUserId = '' /* Start with default value. Once we grab the authentuicated user, it will be replaced */
currentUser:User;
currentUserSubscription:Subscription;
//authentication end

  constructor(private _myService: GroceryService,private location:Location,
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
     
     } // authentication end
  ngOnInit() {
    this.getGroceries();
  }
//method called OnInit
getGroceries() {
//   this._myService.getGroceries().subscribe(   Changed in integrated project
    this._myService.getGroceriesByUser(this.myUserId).subscribe(

//read data and assign to public variable students
      data => { this.groceries = data},
      err => console.error(err),
      () => console.log('finished loading')
    );
  }
  deleteGrocery(id: string,ingredient: string,) {   
    console.log('This will delete item '+ ingredient);    
    alert('This will delete item '+ ingredient);  
    this._myService.deleteGrocery(id);
   
}
back() {
  this.location.back();
}

}
