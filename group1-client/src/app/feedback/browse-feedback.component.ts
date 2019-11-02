import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback/feedback.service';
import { Router, ActivatedRoute} from '@angular/router'
import {AlertService} from '../_services';

// imports for authentication 
import{Subscription} from 'rxjs';
import{first} from 'rxjs/operators';
import {User} from '../_models';
import {UserService,AuthenticationService} from '../_services';
// imports for authentication end 

@Component({
  selector: 'app-browse-feedback',
  templateUrl: './browse-feedback.component.html',
  styleUrls: ['./browse-feedback.component.css']
})
export class BrowseFeedbackComponent implements OnInit {

  title='View All Feedbacks';
  public feedbackhistory;

  
// authentication start
myUserId = '' /* Start with default value. Once we grab the authentuicated user, it will be replaced */
currentUser:User;
currentUserSubscription:Subscription;
//authentication end

  constructor(private _myService:FeedbackService,
    private router:Router,private alertService:AlertService,
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

  ngOnInit() {
    this.loadPage();
  }
loadPage(){
  this._myService.getFeedbackByUser(this.myUserId).subscribe(

    data => { this.feedbackhistory = data},
    err => this.alertService.error(err),
    () => console.log('finished loading')
  );

  }

  editFeedback(_id:string,Recipeno:string,firstname:string,Lastname:string,comments:string){
    this.router.navigate(['/edit-feedback',_id,{Recipeno:Recipeno,firstname:firstname,Lastname:Lastname,comments:comments}])
   
    //alert('Edit feedback. Under construction'+ _id)
  }

  deleteFeedback(_id:string){
    this._myService.deletefeedback(_id).subscribe(
      data =>{
        this.loadPage();
      
        this.alertService.success('Feedback Deleted Successfully!',false);
               
      },
      error=>{
        this.alertService.error(error);
       
      });
   // location.reload
   this.loadPage();
  }
  /* Create Feedback only availabe from a Recipe page
  createFeedback(){
    this.router.navigate(['/create-feedback'])
  }
  */
}

