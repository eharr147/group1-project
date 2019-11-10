import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,ParamMap} from '@angular/router'
import {NutritionService} from './nutrition.service'


@Component({
  selector: 'app-get-nutrition',
  templateUrl: './get-nutrition.component.html',
  styleUrls: ['./get-nutrition.component.css']
})


export class GetNutritionComponent implements OnInit {

  public food_name: string

  public food_list
  public foods

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public myNutritionService: NutritionService
   ) { }

  ngOnInit() {
  }

  searchFood() {
    console.log('get-nutrition.searchFood called. Food name = ' + this.food_name)
      this.myNutritionService.searchFood(this.food_name).subscribe(
      //read data and assign to public variables
      data => { this.food_list = data
              this.foods=this.food_list.foods
              console.log('API response')
              console.log(this.food_list)
              },
      err => console.error(err),
      () => console.log('finished call USDA API')
    );

  };

}
