import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute,ParamMap} from '@angular/router'
import {FeedbackService} from '../feedback/feedback.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { stringify } from 'querystring';
import {AlertService} from '../_services';

// imports for authentication 
import{Subscription} from 'rxjs';
import{first} from 'rxjs/operators';
import {User} from '../_models';
import {UserService,AuthenticationService} from '../_services';
// imports for authentication end 


@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {
title="Provide Feedback"
private mode='add'; //default mode
private id :string; //Feedback id? 
/* Recipe Id and Title come in the URL then this component is called */
private recipeTitle:string; 
private recipeId: string;

private Firstname:string;
private Lastname:string;
private RecipeNo:string;
private Comments:string;
private feedbackedit;

feedbackform=new FormGroup({
  //  Firstname: new FormControl('',Validators.required),
  //  Lastname: new FormControl('',Validators.required),
  //  Recipeno: new FormControl('',Validators.required),
    comments:new FormControl('',Validators.required)
  })

// authentication start
myUserId = '' /* Start with default value. Once we grab the authentuicated user, it will be replaced */
myFirstName = '' 
myLastName = ''
currentUser:User;
currentUserSubscription:Subscription;
//authentication end

  constructor(private fb:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private location: Location,
    public feedbackservice:FeedbackService,private alertService:AlertService,
      // authentication start
      private authenticationService:AuthenticationService
      ) { 
    
        this.currentUserSubscription=this.authenticationService.currentUser.subscribe(
        user =>{
          this.currentUser=user;
         });
        if (this.currentUser ) {
          this.myUserId = this.currentUser.username
          this.myFirstName = this.currentUser.firstName
          this.myLastName=this.currentUser.lastName

        }
      
      } // authentication end


  ngOnInit() {
  
    this.LoadPage();
  }

  LoadPage()
  {
    this.activatedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      // Check is component activated via Edit route
      if(paramMap.has('_id'))
      {
        this.mode='edit';
        this.title='Edit Feedback';
         //request had a parameter _id */
       this.id=paramMap.get('_id');
       
     this.activatedRoute.params.forEach((urlParams)=>{
      //this.recipeTitle=urlParams['recipeTitle'];
      this.RecipeNo=urlParams['Recipeno'];
      this.Firstname=urlParams['firstname'];
      this.Lastname=urlParams['Lastname'];
      this.Comments=urlParams['comments'];
     });
     
      }
        else{this.mode='add';
      this.title='Provide Feedback';
      // Grab recipe id and title from parameters 
      this.recipeId=paramMap.get('recipeId');
      this.recipeTitle=paramMap.get('recipeTitle');
    }
      
    });
   
  }
  
  onSubmit(){
    console.log("Create feedback component: You Submitted :");
    console.log(this.feedbackform.value);
    if(this.mode=='add')
    
    this.feedbackservice.addfeedback(
      this.myUserId, this.recipeTitle,
      this.myFirstName,
      this.myLastName,
      //this.feedbackform.controls.firstname.value,
      //this.feedbackform.controls.Lastname.value,
      //this.feedbackform.controls.Recipeno.value,
      this.recipeId,
      this.feedbackform.controls.comments.value).subscribe(

        data =>{
          this.alertService.success('Feedback Submitted Successfully!',false);
                 
        },
        error=>{
          this.alertService.error(error);
         
        });
        //this.goBack();
    
      if(this.mode=='edit')
      {
      this.feedbackservice.updatefeedback(this.id,
        //this.feedbackform.controls.Recipeno.value,
        //this.feedbackform.controls.firstname.value,this.feedbackform.controls.Lastname.value
        this.feedbackform.controls.comments.value).subscribe(

          data =>{
            this.alertService.success('Feedback Updated Successfully!',false);
                   
          },
          error=>{
            this.alertService.error(error);
           
          });
            //this.router.navigate(['/feedback-browse']);  
        
      
    }
    }
 
    goBack() {
      this.location.back()
    }
  
}
