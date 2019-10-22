import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AlertService,UserService,AuthenticationService} from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public pageTitle = 'Welcome to Meal Planner!';
registerForm:FormGroup;
loading=false;
submitted=false;
  constructor(   private formBuilder:FormBuilder,
    private router:Router,
    private authenticationService:AuthenticationService,
    private userService:UserService,
    private alertService:AlertService

    ) { 
//redirect to hime if already logged in 
if(this.authenticationService.currentUserValue){
  this.router.navigate(['/']);
}
 
  }

  ngOnInit() {

    this.registerForm=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      username:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }

get f() { return this.registerForm.controls;}

onSubmit(){

  this.submitted=true;
  console.log('Register form')
  console.log(this.f)
  //stop here if form is invalid
  if(this.registerForm.invalid){
    return;
  }

  this.loading=true;
  this.userService.register(this.registerForm.value)
  .pipe(first())
  .subscribe(

    data =>{
      this.alertService.success('Registration Successful',true);
      //this.router.navigate(['/welcome']);
      this.router.navigate(['/login']);
    },
    error=>{
      this.alertService.error(error);
      this.loading=false;
    });
  
}

}
