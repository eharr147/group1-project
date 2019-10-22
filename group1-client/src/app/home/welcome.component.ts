import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';
@Component({
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  public pageTitle = 'Welcome to Meal Planner!';
  author="E. Harris, E. Gladstone, H. Reddy and A. K-Pushpakath"
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  constructor(
    private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService
  ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
          this.currentUser = user;
      });
  }
validform=true;

  ngOnInit() {
    this.loadAllUsers();
  }
  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
        this.users = users;
    });
}
logout() {
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}
}
