//create-schedule.component.ts 

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router'
import { QueueService} from '../catalog/queue.service'
import { IRecipe } from '../shared/recipe';
import {ScheduleService} from '../schedule/schedule.service'
import { ISchedule, IMealDish } from '../shared/schedule';



@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  title = "Plan a Meal"

  scheduleForm: FormGroup 

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public queueService: QueueService,
              private scheduleService: ScheduleService) {
   }

  ngOnInit() {
  /* Initialize arrays */

  
    this.scheduleForm=this.fb.group({
    mealDate: [new Date(), Validators.required],
    mealTime: ['dinner']  , 
    mealDishes: this.fb.array([]),
    
    mealNotes: this.fb.array([]
      /*[this.fb.control('first')]*/
    )
   
  })

  /*this.scheduleForm.get('mealTime').setValue('dinner')*/
  /*this.scheduleForm.get('mealTime').setValue(this.mealTimeOptions['2'])*/
  
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
  addNote() {
    this.mealNotes.push(this.fb.control(''));
   
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
      this.router.navigate(['/catalog-browse'])
  }


saveSchedule() {
  alert("This will eventually save schedule to MongoDb")
  
    console.log("You submitted: ");
    console.log(this.scheduleForm.value)

    //this.scheduleService.addSchedules(this.mealDate ,this.mealTimeKey, this.mealTimeValue);
    this.scheduleService.addSchedule(this.scheduleObj);
  
  }

onCancel(): void {
  alert('This will now take you back to the Welcome page. Later we will reset the form.')
  this.router.navigate(['/welcome'])
}
}
