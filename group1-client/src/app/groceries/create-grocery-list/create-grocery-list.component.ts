import { Component, OnInit,Input } from '@angular/core';
import { GroceryService} from '../grocery.service';
import {ActivatedRoute,ParamMap} from'@angular/router';
@Component({
  selector: 'app-create-grocery-list',
  templateUrl: './create-grocery-list.component.html',
  styleUrls: ['./create-grocery-list.component.css']
})
export class CreateGroceryListComponent implements OnInit {
  @Input() ingredient: string;
  @Input() quantity: string;
  private mode='add';
  private id:string;
  public groceries;
  constructor(private _myService:GroceryService,public route:ActivatedRoute) { }

  onSubmit()
  {  
    if(this.mode == 'add') {    
    this._myService.createGroceryList(this.ingredient ,this.quantity);
    }else (this.mode == 'edit')       
    this._myService.editGroceryList(this.id,this.ingredient ,this.quantity);
    
 console.log("You submitted: " + this.ingredient + " " + this.quantity);
 //this._myService.createGroceryList(this.ingredient,this.quantity);  
}
  
  ngOnInit() {
    
    this.route.paramMap.subscribe((paramMap: ParamMap ) => { 
      if (paramMap.has('_id'))    
         {
          this.mode = 'edit'; /*request had a parameter _id */  
          this.id = paramMap.get('_id');           
          this.getGroceriesId(this.id);         
           }   
        else {
           this.mode = 'add';   
           this.id = null; }
    });
   
  }
  
  getGroceriesId(id: string) {   
    this._myService.getGroceriesId(this.id).subscribe(
      //read data and assign to public variable schedules
      data => { this.groceries = data},
      err => console.error(err),
      () => console.log('finished loading groceries')
    );
   }
}

