//browse-schedule.component.ts

import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule/schedule.service';  
import { Router, ActivatedRoute} from '@angular/router'

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
  constructor(private _myService: ScheduleService,
    private router: Router) { }
  ngOnInit() {
    this.loadPage();
  }

    //method called OnInit
    loadPage() {
      this._myService.getSchedules().subscribe(
         //read data and assign to public variable schedules
         data => { this.schedules = data},
         err => console.error(err),
         () => console.log('finished loading schedules')
       );
     }
   
     editSchedule(_id: number) {
        alert('This will load schedule entry for editing: '+ _id)
    }

    deleteSchedule(_id: number) {
      alert('This will delete schedule entry '+ _id)
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