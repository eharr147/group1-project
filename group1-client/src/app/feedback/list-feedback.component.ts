import { Component, OnInit, Input } from '@angular/core';
import { FeedbackService } from '../feedback/feedback.service';
import { Router, ActivatedRoute,ParamMap} from '@angular/router'
import {AlertService,UserService,AuthenticationService} from '../_services';

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.css']
})
export class ListFeedbackComponent implements OnInit {

  title='Feedback';
  public feedback;

  @Input() Recipeno: string;

  constructor(private _myService:FeedbackService,
    private router:Router ,
    private activatedRoute:ActivatedRoute,private alertService:AlertService) { }

  ngOnInit() {
    this.loadPage();
  }

  
  loadPage(){
    this._myService.getFeedbackbyRecipeID(this.Recipeno).subscribe(
  
      data => { this.feedback = data},
      err => this.alertService.error(err),
      () => console.log('finished loading feedback by Recipe')
    );
   //alert(this.Recipeno)
 /* Changed the component communication method to @Input 
    this.activatedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('Recipeno'))
      {
            
        
       this.Recipeno=paramMap.get('Recipeno');
       
       this._myService.getFeedbackbyRecipeID(this.Recipeno).subscribe(
  
        data => { this.feedback = data},
        err => this.alertService.error(err),
        () => console.log('finished loading')
      );
     
      }
       
      
    });
    }
*/
  }
}
