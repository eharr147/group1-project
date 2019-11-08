//create-schedule.component.ts 

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router'
import { QueueService} from '../catalog/queue.service'
import { IRecipe } from '../catalog/recipe';
import {ScheduleService} from '../schedule/schedule.service'
import { ISchedule, IMealDish } from './schedule';

// imports for authentication 
import{Subscription} from 'rxjs';
import{first} from 'rxjs/operators';
import {User} from '../_models';
import {UserService,AuthenticationService} from '../_services';
// imports for authentication end 
import {AlertService} from '../_services';



@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  title = "Plan a Meal"
  message = ""

  scheduleForm: FormGroup 
  schedule_id = ''

  // authentication start
  myUserId = '' /* Start with default value. Once we grab the authentuicated user, it will be replaced */
  currentUser:User;
  currentUserSubscription:Subscription;
//authentication end

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public queueService: QueueService,
              private scheduleService: ScheduleService,
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
  /* Initialize arrays */

  var today = new Date();
  
    this.scheduleForm=this.fb.group({
    mealDate: [today, Validators.required],
    mealTime: ['dinner']  , 
    mealDishes: this.fb.array([]),
    
    mealNotes: this.fb.array([]
      /*[this.fb.control('first')]*/
    )
   
  })

  //console.log(today)
  //this.scheduleForm.get('mealDate').setValue(today)

if (this.queueService.schedule != null && this.queueService.schedule_id == this.schedule_id) {
  this.restoreState(this.queueService.schedule)
 }
 else {
   this.queueService.clearState
 }
  
  if (this.queueService.recipes.length==0) 
  {
      console.log('CreateSchedule - queue was empty');
      //this.addDish('main') /* Insert a first Dish */
  } 
  else
  {
      console.log('CreateSchedule - queue NOT empty'); 
      var j:any
      for (j in this.queueService.recipes) {
          this.loadDish(this.queueService.recipes[j])
      }
      
  }


  }

restoreState(schedule) {
      /* use split to remove the timestamp part from saved date */
      this.scheduleForm.get('mealDate').setValue(schedule.mealDate.toString().split('T')[0]);
      this.scheduleForm.get('mealTime').setValue(schedule.mealTime);

      var j:any
      for (j in schedule.mealNotes) {
          this.addNote(schedule.mealNotes[j])
      }
}

loadDishFromSchedule(dish: IMealDish) {
  /*Creates a dish in the mealDishes form group from a the Schedule instance being edited in this component*/

  console.log('loadDishFromSchedule called')
  console.log(dish)


  this.mealDishes.push(
    this.fb.group({
      dishType: [dish.dishType], 
      recipeId: [dish.recipeId],
      recipeTitle: [dish.recipeTitle],
      recipeDesc: [dish.recipeDesc]})
                )
}

  // Getters and Setters

  // Used to populate the form. DO NOT delete 
  get mealNotes() {
    return this.scheduleForm.get('mealNotes') as FormArray;
  }
  
  get mealDishes() {
    return this.scheduleForm.get('mealDishes') as FormArray;
  }

  /* getter to create a Schedule object to send to server */
  get scheduleObj() {

     let thisObj : ISchedule = {
    userId: this.myUserId,
    mealDate : this.scheduleForm.get('mealDate').value,
    mealTime : this.scheduleForm.get('mealTime').value,
    //mealDishes : this.scheduleForm.controls.mealDishes.value,
    mealDishes : this.scheduleForm.get('mealDishes').value,
    mealNotes : this.scheduleForm.get('mealNotes').value
    }
    return thisObj
  }

  /* managing the mealNotes array */
  /* Getters and setters */

  /* addNote inserts a new instance in the array */
  addNote(pNote) {
    this.mealNotes.push(this.fb.control(pNote));
  
  }
  removeNote(noteIndex: number): void {
    (<FormArray>this.scheduleForm.get('mealNotes')).removeAt(noteIndex);
  }


  /* managing the mealDishes array */

  /* addDish inserts a new instance in the array */
  
  
  loadDish(recipe: IRecipe) {
    /*Creates a dish in the mealDishes from group from a saved recipe in queueServices*/

    //var toSelect = (this.dishTypeOptions.findIndex(c => c.key == recipe.usage));

    this.mealDishes.push(
      this.fb.group({
        dishType: [recipe.usage], // make this better - add a default
        recipeId: [recipe._id],
        recipeTitle: [recipe.name,Validators.required],
        recipeDesc: [recipe.description,Validators.required]})
                  )
  }

  removeDish(dishGroupIndex: number): void {
    (<FormArray>this.scheduleForm.get('mealDishes')).removeAt(dishGroupIndex);
    this.queueService.remove(dishGroupIndex) // remove selection from queue as well
  }


  goCatalog(): void {
    /* Navigates to Recipe Catalog to pick more recipes */
      /* save form state first.... so we can reload */ 
      this.queueService.saveState(this.scheduleObj, this.schedule_id) // scheduleObj is a getter
      this.router.navigate(['/catalog-browse/return'])
  }

  goSchedules(): void {
    /* Navigates to Schedule List */
      this.router.navigate(['/schedule-browse'])
  }

saveSchedule() {
  
    console.log("You submitted: ");
    console.log(this.scheduleForm.value)

    this.scheduleService.addSchedule(this.scheduleObj).subscribe(

      data =>{
        this.alertService.success('Schedule entry saved!',false);
               
      },
      error=>{
        this.alertService.error(error);
       
      });

    this.queueService.clear(); /* clear selected recipes */
    this.scheduleForm.reset();
    this.ngOnInit();
    //this.message="Schedule entry saved. Going back to your schedule list."
    //alert(this.message)
    //this.router.navigate(['/schedule-browse'])
 
  }

onCancel(): void {
  this.scheduleForm.reset();
  this.queueService.clear(); /* clear selected recipes */
  alert("Operation cancelled. Schedule entry has been cancelled.")
  //location.reload
  this.router.navigate(['/schedule-browse']  )
}

}