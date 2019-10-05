import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {FormArray} from '@angular/forms';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  feedbackform=new FormGroup({
    firstname: new FormControl(''),
    Lastname: new FormControl(''),
    Recipeno: new FormControl(''),
    comments:new FormControl('')
  })
  constructor() { }


  ngOnInit() {
  }

  onSubmit(){
    this.feedbackform.value;
  }
}
