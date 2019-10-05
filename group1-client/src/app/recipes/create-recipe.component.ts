import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent  {

  recipeForm = this.formBuilder.group({
    name : [''],
  ingredients : this.formBuilder.array([
    this.formBuilder.control('')
  ]),
  ingredientsWithQuantity : this.formBuilder.array([
    this.formBuilder.group({
      'name': [''],
      'quantity': [''],
      'steps': ['']
    })
  ])
  });
  
  constructor(private formBuilder: FormBuilder){
    
  }
  get name() {
    return this.recipeForm.get('name') as FormControl;
  }
  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  addingredient() { 
     this.ingredients.push(this.formBuilder.control(''));
   
  }
  //get ingredientsWithQuantity() {
  //  return this.recipeForm.get('ingredientsWithQuantity') as FormArray;
  //}
  addingredientsWithQuantity() { 
    let ingredient = this.recipeForm.get('ingredientsWithQuantity') as FormArray;
    ingredient.controls.push(this.formBuilder.group({
      'name': [''],
      'quantity': [''],
      'steps': ['']
    }));
   
  }
  }
 





