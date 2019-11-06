import { Component, OnInit } from '@angular/core';
import {GroceryService} from './grocery.service';
@Component({
  selector: 'app-browse-groceries',
  templateUrl: './browse-groceries.component.html',
  styleUrls: ['./browse-groceries.component.css']
})
export class BrowseGroceriesComponent implements OnInit {
   
  public groceries;
  constructor(private _myService: GroceryService) { }
  ngOnInit() {
    this.getGroceries();
  }
//method called OnInit
getGroceries() {
   this._myService.getGroceries().subscribe(
//read data and assign to public variable students
      data => { this.groceries = data},
      err => console.error(err),
      () => console.log('finished loading')
    );
  }
  deleteGrocery(id: string) {
   
    console.log('This will delete ingredient'+ id);
    alert('This will delete schedule entry '+ id)
    this._myService.deleteGrocery(id);
   
}

}
