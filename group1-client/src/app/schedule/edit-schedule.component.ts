//edit-schedule.component.ts 

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap} from '@angular/router'
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

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {
  title = "Update a Meal Plan"
  message = ""
  private schedule_id: string // if form used for Edit, the argument "_id" is saved here

  public schedule // holds schedule entry in Edit mode

   scheduleForm: FormGroup 

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
              private authenticationService:AuthenticationService) {
                this.currentUserSubscription=this.authenticationService.currentUser.subscribe(
                  user =>{
                    this.currentUser=user;
                  });
                  if (this.currentUser ) {
                    this.myUserId = this.currentUser.username
                  }
                // Crreate Edit form
                this.createForm()
   }

  ngOnInit() {

        /* Check if component was called in Edit mode */

  this.activatedRoute.paramMap.subscribe((paramMap: ParamMap ) => {
        this.schedule_id = paramMap.get('_id');

  });

  if (this.queueService.schedule != null && this.queueService.schedule_id == this.schedule_id) {
    this.restoreState(this.queueService.schedule)
  }
  else {
    this.queueService.clearState;
    this.loadPage(this.schedule_id ) // Load data for desired schedule
 
  }
  
  
  /*this.scheduleForm.get('mealTime').setValue('dinner')*/
  /*this.scheduleForm.get('mealTime').setValue(this.mealTimeOptions['2'])*/
  
  if (this.queueService.recipes.length==0) 
  {
      console.log('EditSchedule - queue was empty');
      //this.addDish('main') /* Insert a first Dish */
  } 
  else
  {
      console.log('EditSchedule - queue NOT empty'); 
      var j:any
      for (j in this.queueService.recipes) {
          this.loadDish(this.queueService.recipes[j])
      }
      
  }


  }

createForm() {
  this.scheduleForm=this.fb.group({
    mealDate: [new Date(), Validators.required],
    mealTime: ['dinner']  , 
    mealDishes: this.fb.array([]),
    
    mealNotes: this.fb.array([]
      /*[this.fb.control('first')]*/
    )
      })

};


  loadPage(scheduleId: string) {
    this.scheduleService.editSchedule(scheduleId).subscribe(data => { 
      this.schedule = data;
      /* use split to remove the timestamp part from saved date */
      this.scheduleForm.get('mealDate').setValue(this.schedule.mealDate.toString().split('T')[0]);
      this.scheduleForm.get('mealTime').setValue(this.schedule.mealTime);
// 
      var i:any
      
      for (i in this.schedule.mealDishes) {
          /* Load dishes from MongoDB to form */
          this.loadDishFromSchedule(this.schedule.mealDishes[i])
          /* Also save loaded dishes to queueService */
          var tempRecipe: IRecipe = {
          _id:this.schedule.mealDishes[i].recipeId,
          description:this.schedule.mealDishes[i].recipeDesc,
          name:this.schedule.mealDishes[i].recipeTitle,
          usage:this.schedule.mealDishes[i].dishType
          }
          this.queueService.add(tempRecipe)
      }

      var j:any
      for (j in this.schedule.mealNotes) {
          this.addNote(this.schedule.mealNotes[j])
      }
      //this.addNote(this.schedule.mealNotes[0])
    }
      ,
       err => console.error(err),
       () => console.log('finished loading for Edit schedules')
     );

     console.log(this.schedule)


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


  
  loadDish(recipe: IRecipe) {
    /*Creates a dish in the mealDishes form group from a saved recipe in queueServices*/

    //var toSelect = (this.dishTypeOptions.findIndex(c => c.key == recipe.usage));

    console.log('loadDish called')
    console.log(recipe)
    console.log(recipe.usage)
    console.log(recipe.name)

    this.mealDishes.push(
      this.fb.group({
        dishType: [recipe.usage], 
        recipeId: [recipe._id],
        recipeTitle: [recipe.name,Validators.required],
        recipeDesc: [recipe.description,Validators.required]})
                  )
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
    /* Navigates to Recipe Catalog to pick more recipes */
      this.router.navigate(['/schedule-browse'])
  }

  viewSelection(_id: number) {
    this.router.navigate(['catalog-view/'+ _id] )
  }
saveSchedule() {
  
    console.log("You submitted: ");
    console.log(this.scheduleForm.value)


    this.scheduleService.updateSchedule(this.schedule_id, this.scheduleObj);
    this.queueService.clear(); /* clear selected recipes */
    //this.scheduleForm.reset();
    this.message="Schedule entry saved. Going back to your schedule list."
    alert(this.message)
    this.router.navigate(['/schedule-browse'])
 
  }

onCancel(): void {
  this.scheduleForm.reset();
  this.queueService.clear(); /* clear selected recipes */
  alert("Operation cancelled. Schedule entry has been reset.")
  //location.reload
  this.router.navigate(['/schedule-browse']  )
}
}
