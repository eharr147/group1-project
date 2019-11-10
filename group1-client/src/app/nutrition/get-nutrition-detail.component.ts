import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router'
import { NutritionService } from './nutrition.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-get-nutrition-detail',
  templateUrl: './get-nutrition-detail.component.html',
  styleUrls: ['./get-nutrition-detail.component.css']
})
export class GetNutritionDetailComponent implements OnInit {

  food_id
  public facts

  constructor(private activatedRoute: ActivatedRoute,
    private myNutritionService: NutritionService,
    private location: Location,
    private router: Router) {}

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap ) => {
      this.food_id = paramMap.get('_id');})

    this.getFacts(this.food_id ) 
  }


  getFacts(food_id) {
    console.log('get-nutrition-detail.getFacts called. Food id = ' + this.food_id)
      this.myNutritionService.getFacts(food_id).subscribe(
      //read data and assign to public variables
      data => { this.facts = data
              //this.foods=this.food_list.foods
              console.log('API response')
              console.log(this.facts)
              },
      err => console.error(err),
      () => console.log('finished call USDA API')
    );

  };




  goBack() {
    this.location.back()
  }

}
