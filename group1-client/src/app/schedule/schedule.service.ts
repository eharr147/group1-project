// schedule.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ISchedule} from '../shared/schedule' // Interface for Schedule object

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

      // Uses http.post() to post data 

  addSchedule(scheduleObj: ISchedule) {
    this.http.post('http://localhost:8000/schedule/add',scheduleObj)
  .subscribe((responseData) => {
     console.log(responseData);
   }); 
}

  
}
