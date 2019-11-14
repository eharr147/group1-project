import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, FormArrayName } from '@angular/forms';
import {RecipeService} from './recipe.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';

// imports for authentication 
import{Subscription} from 'rxjs';
import{first} from 'rxjs/operators';
import {User} from '../_models';
import {UserService,AuthenticationService} from '../_services';
// imports for authentication end 
import {AlertService} from '../_services';


@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  // authentication start
  myUserId = '' /* Start with default value. Once we grab the authentuicated user, it will be replaced */
  currentUser:User;
  currentUserSubscription:Subscription;
//authentication end

title=""
recipeForm: FormGroup 

  constructor(private formBuilder: FormBuilder , private myservice: RecipeService,
     private route: Router, private router: ActivatedRoute,
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
     
     } // authentication end){
    


  ngOnInit() {

    
      this.recipeForm=this.formBuilder.group({
      name : [''],
      description:      [''],
      cuisine:          [''],
      usage:            [''],
      contributor:      [''],
      effort_lvl:       [''],
      servings:         [1], // default 1 serving
      calories:         [0], // default 0 calories      
      ingredients: this.formBuilder.array([]), 
      steps: this.formBuilder.array([]) 
      })
     

      this.router.paramMap.subscribe((paramMap: ParamMap ) => {
        if (paramMap && paramMap.has('_id'))
          { this.mode = 'edit'; /*request had a parameter _id */ 
            this.id = paramMap.get('_id');
            this.title="Update a Recipe"
            this.myservice.getRecipes().subscribe(
      
              
              data => { 
                let recipes: any = data;
                let recipe = recipes.find(r => r._id == this.id);
                this.recipeForm.get('name').setValue(recipe.name);
                this.recipeForm.get('description').setValue(recipe.description);
                this.recipeForm.get('cuisine').setValue(recipe.cuisine);             
                this.recipeForm.get('usage').setValue(recipe.usage);
                this.recipeForm.get('effort_lvl').setValue(recipe.effort_lvl);
                this.recipeForm.get('servings').setValue(recipe.servings);
                this.recipeForm.get('calories').setValue(recipe.calories);
                /* Load Ingredients and Steps to form */
                this.loadArrays(recipe)

              },
              
              err => console.error(err),
              
              () => console.log('finished loading')
              
              );
          }
        else {this.mode = 'add';
            this.id = null; 
            this.title="Create a Recipe"
            /* Add first ingredient and step */    
            this.addIngredient();
            this.addStep();
          }
      });
    }


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

loadArrays(recipe) {
  var i, ing, step
      
  for (i in recipe.ingredients) {
      ing = recipe.ingredients[i]
      this.ingredients.push(this.formBuilder.group({
          quantity: [ing.quantity], 
          unit: [ing.unit],
          name: [ing.name]    })     
        )

  }

  for (i in recipe.steps) {
      step=recipe.steps[i]
      this.steps.push(this.formBuilder.control(step)
      )
  }


}




  //public route: ActivatedRoute;
  private mode = 'add'; //default mode
  private id: string; //student ID
  onSubmit(){
    let name = this.recipeForm.get('name').value;
    let description = this.recipeForm.get('description').value;
    let cusine = this.recipeForm.get('cuisine').value;
    
    let usage = this.recipeForm.get('usage').value;
    let effort_lvl = this.recipeForm.get('effort_lvl').value;
    let servings = this.recipeForm.get('servings').value;
    let calories = this.recipeForm.get('calories').value;

    // Subscribes to service response - provide alert messages
    if(this.mode == 'add') {
      this.myservice.addRecipes(name, description, cusine, usage, effort_lvl, this.myUserId, servings, calories, this.ingredients.value, this.steps.value).subscribe(
        data =>{
          this.alertService.success('Recipe saved!',false);
                 
        },
        error=>{
          this.alertService.error(error);
         
        });


    }
      //this.myservice.addRecipes(name, description, cusine, usage, effort_lvl, "chef", servings, calories, this.ingredients.value, this.steps.value);
    
    
    if(this.mode == 'edit') {
      this.myservice.updateRecipe(this.id, name, description, cusine, usage, effort_lvl, this.myUserId, servings, calories, this.ingredients.value, this.steps.value).subscribe(
        data =>{
          this.alertService.success('Recipe saved!',false);
                 
        },
        error=>{
          this.alertService.error(error);
         
        });


    }
      //this.myservice.updateRecipe(this.id, name, description, cusine, usage, effort_lvl, this.myUserId, servings, calories, this.ingredients.value, this.steps.value);
    

      //alert ("Your recipe has been submitted. Thank you for your contribution!");
  
     //this.route.navigate(['recipes-browse']);
     //location.reload;
  }
 
}
