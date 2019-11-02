// schedule.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ISchedule} from './schedule' // Interface for Schedule object


//we know that response will be in JSON format
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http:HttpClient) {}
 
  // Uses http.get() to load data 
  getSchedules() {
      return this.http.get('http://localhost:8000/schedules');
  }

  // Uses http.get() to load data 
  getSchedulesByUser(userId) {
    return this.http.get('http://localhost:8000/schedule/user/' + userId);
}

  editSchedule(_id: string) {
    console.log('schedule.service.editSchedule - _id = ' + _id);
    return this.http.get("http://localhost:8000/schedule/edit/" + _id);
  }

      // Uses http.post() to post data 

  addSchedule(scheduleObj: ISchedule) {
    this.http.post('http://localhost:8000/schedule/add',scheduleObj)
  .subscribe((responseData) => {
     console.log(responseData);

   }); 
  }

  updateSchedule(_id: string,scheduleObj: ISchedule) {
    this.http.put('http://localhost:8000/schedule/update/'+ _id,scheduleObj)
  .subscribe((responseData) => {
     console.log(responseData);

   }); 
  }

 
  deleteSchedule(_id: string) {
    console.log('schedule.service.deleteSchedule - _id = ' + _id)
    this.http.delete("http://localhost:8000/schedules/" + _id)
      .subscribe(() => {
          console.log('Deleted: ' + _id);
      });
  }



}




  

