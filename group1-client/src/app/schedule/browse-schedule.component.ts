//browse-schedule.component.ts

import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule/schedule.service';  
import { Router, ActivatedRoute} from '@angular/router'
import { QueueService} from '../catalog/queue.service'

// imports for authentication 
import{Subscription} from 'rxjs';
import{first} from 'rxjs/operators';
import {User} from '../_models';
import {UserService,AuthenticationService} from '../_services';
// imports for authentication end 


@Component({
  selector: 'app-browse-schedule',
  templateUrl: './browse-schedule.component.html',
  styleUrls: ['./browse-schedule.component.css']
})
export class BrowseScheduleComponent implements OnInit {

  title = 'Browse Schedule';
  //declare variable to hold response and make it public to be accessible from components.html
  public schedules; // leave this is type ANY. Strong typing it causes errors when assigning value from HTTP response
  //initialize the call using ScheduleService 

// authentication start
  myUserId = '' /* Start with default value. Once we grab the authentuicated user, it will be replaced */
  currentUser:User;
  currentUserSubscription:Subscription;
//authentication end


  constructor(private _myService: ScheduleService,
    private router: Router,
    public queueService: QueueService,
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
    this.queueService.clear() // remove any selections from cache
    this.loadPage();
  }

    //method called OnInit
    loadPage() {
      // for individual project, hard code userId = 1. Will fix in integrated project
      this._myService.getSchedulesByUser(this.myUserId).subscribe(
         //read data and assign to public variable schedules
         data => { this.schedules = data},
         err => console.error(err),
         () => console.log('finished loading schedules')
       );
     }
   
    deleteSchedule(_id: string) {
      alert('This will delete schedule entry '+ _id)
      this._myService.deleteSchedule(_id);
      location.reload()
  }

  createSchedule() {
    this.router.navigate(['/schedule-create'])
   }
    /* Aux functions */
  decodeDish(pDishType : string) : string {

    switch(pDishType) {
      case 'main':
        return 'Main Dish'
        break;
      case 'side':
        return "Side Dish"
        break;
        case 'dessert':
          return "Dessert"
          break;
        case 'snack':
            return "Snack"
            break;
        case 'breakfast':
              return "Breakfast"
              break;
  
        default:
        return ""
    }
    
  }

decodeMeal(pMeal: string) : string {
  switch(pMeal) {
    case 'breakfast':
      return 'Breakfast'
      break;
    case 'lunch':
      return "Lunch"
      break;
      case 'dinner':
        return "Dinner"
        break;
      case 'snack':
          return "Snack"
          break;

      default:
      return ""
  }
}

}