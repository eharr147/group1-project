import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import {formatDate} from'@angular/common';
@Component({
  selector: 'app-create-groceries',
  templateUrl: './create-groceries.component.html',
  styleUrls: ['./create-groceries.component.css']
})
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
