import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, FormArrayName } from '@angular/forms';
import {RecipeService} from './recipe.service';


@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder , private myservice: RecipeService){}

  recipeForm: FormGroup 

  ngOnInit() {
    
      this.recipeForm=this.formBuilder.group({
      name : [''],
      description:      [''],
      cuisine:          [''],
      usage:            [''],
      effort_lvl:       [''],
      contributor:      [''],
      servings:         [1], // default 1 serving
      calories:         [0], // default 0 calories
      ingredients: this.formBuilder.array([]), 
      steps: this.formBuilder.array([]) 
      })
     
      /* Add first ingtredient and step */
      this.addIngredient();
      this.addStep();
    }

 // Getters ans setters neeeded only for arrays

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addStep() { 
     this.steps.push(this.formBuilder.control(''));
 
  }

  addIngredient() { 
  this.ingredients.push(this.formBuilder.group({

      quantity: [1], // default qty to 1
      unit: [''],
      name: ['']
      
    }));
   
  }
  onSubmit(){
    console.log('onSubmit called')
    console.log("you submitted:" + 
    this.recipeForm.get('name').value + " " +
     this.recipeForm.get('description').value + " " + this.recipeForm.get('cuisine').value)
    this.myservice.addRecipes(
    this.recipeForm.get('name').value,
     this.recipeForm.get('description').value ,
     this.recipeForm.get('cuisine').value,
     this.recipeForm.get('usage').value,
     this.recipeForm.get('effort_lvl').value,
     this.recipeForm.get('contributor').value,
     this.recipeForm.get('servings').value,
     this.recipeForm.get('calories').value,
     this.ingredients.value,
     this.steps.value
     );
  }

 
}
