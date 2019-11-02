import { Component, OnInit,Input } from '@angular/core';
import { GroceryService} from '../grocery.service';
@Component({
  selector: 'app-create-grocery-list',
  templateUrl: './create-grocery-list.component.html',
  styleUrls: ['./create-grocery-list.component.css']
})
export class CreateGroceryListComponent implements OnInit {
  @Input() ingredient: string;
  @Input() quantity: string;

  constructor(private _myService:GroceryService) { }

  onSubmit()
  {
 console.log("You submitted: " + this.ingredient + " " + this.quantity);
 this._myService.createGroceryList(this.ingredient,this.quantity);  
}
  
  ngOnInit() {
  }
  
 
}

