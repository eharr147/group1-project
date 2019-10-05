import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router'



@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  title = "Plan a Meal"

  scheduleForm: FormGroup 

  /* Data for Dropdown lists */
  mealTimeOptions = [
    {key: 'breakfast', value: 'Breakfast'},
    {key: 'lunch', value: 'Lunch'},
    {key: 'dinner', value: 'Dinner'},
    {key: 'snack', value: 'Snack'},
  ];

  dishTypeOptions = [
    {key: 'main', value: 'Entree/Main'},
    {key: 'side', value: 'Side Dish'},
    {key: 'dessert', value: 'Dessert'},
    {key: 'snack', value: 'Snack'},
  ];
  
  selMealTime = ''
  selDishType = ''

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

   }

  ngOnInit() {
  /* Initialize arrays */

  
    this.scheduleForm=this.fb.group({
    mealDate: [new Date(), Validators.required],
    mealTime: this.mealTimeOptions['2'], /* instance [2] = Dinner - Make this fancier later */
     
     mealDishes: this.fb.array([]),
    
    mealNotes: this.fb.array([]
      /*[this.fb.control('first')]*/
    )
   
  })

  /*this.scheduleForm.get('mealTime').setValue('dinner')*/
  /*this.scheduleForm.get('mealTime').setValue(this.mealTimeOptions['2'])*/

  this.addDish('main') /* Insert a first Dish */
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.scheduleForm.value);
  }
  /* managing the mealNotes array */
  /* Getters and setters */
  get mealNotes() {
    return this.scheduleForm.get('mealNotes') as FormArray;
  }
  /* addNote inserts a new instance in the array */
  addNote() {
    this.mealNotes.push(this.fb.control(''));
   
  }
  removeNote(noteIndex: number): void {
    (<FormArray>this.scheduleForm.get('mealNotes')).removeAt(noteIndex);
  }


  /* managing the mealDishes array */
  /* Getters and setters */
  get mealDishes() {
    return this.scheduleForm.get('mealDishes') as FormArray;
  }
  /* addDish inserts a new instance in the array */
  
  addDish(pDishType: string) {
    /*this.mealDishes.push(this.addDishFormGroup('Side'));*/

    var toSelect = (this.dishTypeOptions.findIndex(c => c.key == pDishType));

    this.mealDishes.push(
      this.fb.group({
        dishType: this.dishTypeOptions[toSelect],
        recipeId: [0],
        recipeTitle: ['',Validators.required],
        recipeDesc: ['',Validators.required]})
                  )
  }


  removeDish(dishGroupIndex: number): void {
    (<FormArray>this.scheduleForm.get('mealDishes')).removeAt(dishGroupIndex);
  }

saveSchedule() {
alert("This will eventually save schedule to MongoDb")
}

onCancel(): void {
  alert('This will now take you back to the Welcome page. Later we will reset the form.')
  this.router.navigate(['/welcome'])
}
}
