import { Component, OnInit,Input } from '@angular/core';
import { GroceryService} from './grocery.service';
import {ActivatedRoute,ParamMap,Router} from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup,FormBuilder, FormControl , Validators} from '@angular/forms';
import {formatDate} from'@angular/common';

// imports for authentication 
import{Subscription} from 'rxjs';
import{first} from 'rxjs/operators';
import {User} from '../_models';
import {UserService,AuthenticationService} from '../_services';
// imports for authentication end 
import {AlertService} from '../_services';

@Component({
  selector: 'app-create-groceries',
  templateUrl: './create-groceries.component.html',
  styleUrls: ['./create-groceries.component.css']
})
export class CreateGroceriesComponent implements OnInit {
 
  public groceries;
  groceryForm: FormGroup 
  
  constructor(private _myService:GroceryService,private router:Router,public route:ActivatedRoute
    , private location: Location,private formBuilder:FormBuilder,
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
 private mode='Create';
 private id:string;
 private ingredient: string;
 private quantity: string;
 private unit:string;

 // authentication start
 myUserId = '' /* Start with default value. Once we grab the authentuicated user, it will be replaced */
 currentUser:User;
 currentUserSubscription:Subscription;
//authentication end

  onSubmit()
    {    console.log('create-groeceries onSubmit()')
    if(this.mode == 'Create') {  
      console.log("You submitted: " + this.groceryForm.get('ingredient').value + " " + this.groceryForm.get('quantity').value  + " " + this.groceryForm.get('unit').value);     
      //alert("You submitted: " + this.groceryForm.get('ingredient').value + " " + this.groceryForm.get('quantity').value  + " " + this.groceryForm.get('unit').value); 
      //this._myService.createGroceryList(this.myUserId,this.groceryForm.get('ingredient').value,this.groceryForm.get('quantity').value ,this.groceryForm.get('unit').value);
      this._myService.createGroceryList(this.myUserId,this.groceryForm.get('ingredient').value,this.groceryForm.get('quantity').value ,this.groceryForm.get('unit').value).subscribe(

        data =>{
          this.alertService.success('Grocery Item saved!',false);
                 
        },
        error=>{
          this.alertService.error(error);
         
        });
 
    }
      else {
      //(this.mode == 'Edit')  
      console.log("Your update is : " + this.groceryForm.get('ingredient').value + " " + this.groceryForm.get('quantity').value  + " " + this.groceryForm.get('unit').value);
      //alert("Your update is: " + this.groceryForm.get('ingredient').value + " " + this.groceryForm.get('quantity').value  + " " + this.groceryForm.get('unit').value);   
      //this._myService.editGroceryList(this.id, this.groceryForm.get('ingredient').value,this.groceryForm.get('quantity').value, this.groceryForm.get('unit').value); 
      this._myService.editGroceryList(this.id, this.groceryForm.get('ingredient').value,this.groceryForm.get('quantity').value, this.groceryForm.get('unit').value).subscribe(

        data =>{
          this.alertService.success('Grocery Item updated!',false);
                 
        },
        error=>{
          this.alertService.error(error);
         
        });


      //this.router.navigate(['/groceries-browse']);   
          }       
    }
  
  ngOnInit() {
    this.groceryForm = new FormGroup({
      ingredient: new FormControl(''),
      quantity: new FormControl(''),
      unit: new FormControl('')      
      });

    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
      if (paramMap.has('_id'))
        { this.mode = 'Edit'; 
          this.id = paramMap.get('_id');                   
          this.loadItem(this.id );
        }
      else {this.mode = 'Create';
          this.id = null; }
    });
    console.log('Grocery mode = ' + this.mode)
  }
  
  back() {
    this.location.back();
  }
  clear(): void {
    this.groceryForm.reset();
  }
  loadItem(id:string){
    this._myService.editItem(id).subscribe(data => {      
      this.groceries = data;     
      this.groceryForm.get('ingredient').setValue(this.groceries.ingredient);
      this.groceryForm.get('quantity').setValue(this.groceries.quantity);
      this.groceryForm.get('unit').setValue(this.groceries.unit);
  }
  ,
  err => console.error(err),
  () => console.log('Finished loading Grocery Item Edit ')
);

console.log(this.groceries)
    }
 
}
/*
export class CreateGroceriesComponent implements OnInit {
  
 
  //Lab7 
  today= new Date();
  jstoday = '';
  constructor() {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
  }

  clicked = false;
  radioName1="15";
  radioName2="71";
  buttonClicked(){
    this.clicked=true;
    this.radioName1="Not Allowed";
    this.radioName2="Not Allowed";
    alert("Age group is not allowed currently");
  }
  buttonOnMouseOver(){
   console.log("Age group is not allowed currently");   
  }
  selected = '10am - 12pm';

  ngOnInit() {
  }
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailAddress: new FormControl(''),
    password: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  
  }
}
*/