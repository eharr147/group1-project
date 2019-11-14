import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from 'querystring';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
    providedIn: 'root'
  })
export class FeedbackService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data 
    getFeedbackHistory() {
        return this.http.get('http://localhost:8000/feedbackhistory');
    }

    getFeedbackByUser(userId) {
      return this.http.get('http://localhost:8000/feedback/user/' + userId);
  }


    //get feedback by recipe ID
    getFeedbackbyRecipeID(Recipeno:string){
        console.log('feedback.service.getFeedbackbyRecipeID called')
          return this.http.get("http://localhost:8000/feedback/find/"+Recipeno);
    }

    //get feedback by _Id
    getFeedback(_id:string){
      return this.http.get("http://localhost:8000/feedback/edit/"+_id);

    }
   // Uses http.post() to post data 
   addfeedback(userId: string, recipeTitle: string, firstname: string, Lastname: string,Recipeno:string,comments:string) {
     console.log('addfeedback called')
     console.log('firstname = ' + firstname)
   return this.http.post('http://localhost:8000/feedback/add',
   {userId, recipeTitle, firstname, Lastname,Recipeno,comments},{responseType:'text' as 'json'})
  //.subscribe((responseData) => {
  //   console.log(responseData);
     
 //  }); 
 //  location.reload();
}

deletefeedback(_id:string){
 return  this.http.delete("http://localhost:8000/feedback/delete/"+_id);
  
}

//Update Feedback()
updatefeedback(_id:string,
  // don't update keys and key-derived fields
  //Recipeno:string,firstname:string,Lastname:string,
  comments:string){
  return this.http.put("http://localhost:8000/feedback/update/"+_id,
      {//Recipeno,firstname,Lastname,
        comments})

}
}
