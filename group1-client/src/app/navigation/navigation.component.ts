import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import{Subscription} from 'rxjs';
import{first} from 'rxjs/operators';
import {User} from '../_models';
import {UserService,AuthenticationService} from '../_services';
import { Router } from '@angular/router';




@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit ,OnDestroy {
title="Meal Planner"
currentUser:User;
currentUserSubscription:Subscription;
users:User[]=[];

  constructor(
private router:Router,
  private authenticationService:AuthenticationService,
 private userService:UserService
  ) { 

    this.currentUserSubscription=this.authenticationService.currentUser.subscribe(
    user =>{
      this.currentUser=user;
    });
  
  }
  

  ngOnInit() {
    this.loadAllUsers();
  }
ngOnDestroy(){
  this.currentUserSubscription.unsubscribe();
}
logout(){
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}

private loadAllUsers(){
 this.userService.getAll().pipe(first()).subscribe(users=>{
  this.users=users;
  });
}

}