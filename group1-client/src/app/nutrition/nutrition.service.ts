//nutrition.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const _API_KEY = "TqHOqkgP5xrgx7VjuS01TCr2RQDXawq4uMCMOvFk"

@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  constructor(private http:HttpClient) {}

  searchFood(food_name) {

    //var searchObj = {generalSearchInput : food_name} 
    var searchObj = {
        generalSearchInput : food_name,
        requireAllWords: "true",
        includeDataTypes: {"Survey (FNDDS)":true,"Foundation":true,"Branded":false}
      } 


    return this.http.post('http://localhost:8000/nutrition/search',searchObj)
}

getFacts(food_id) {

  //https://api.nal.usda.gov/fdc/v1/340045?api_key=TqHOqkgP5xrgx7VjuS01TCr2RQDXawq4uMCMOvFk

 console.log('food_id=' + food_id)

  // Can't call USDA API directly from client. Need to go thru middleware proxy to avoid CORS error
 
 return this.http.get('http://localhost:8000/nutrition/detail/' + food_id)

}


searchStations(food_name) {
   // This is an example of an API that uses GET method and is not restricted by CORS policy. Not used in the app.

  //https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=TqHOqkgP5xrgx7VjuS01TCr2RQDXawq4uMCMOvFk&location=Denver+CO

  //var searchObj = {generalSearchInput : food_name} 
  var searchObj = {location : food_name} 

  var URL = "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key="+ _API_KEY

  //return this.http.get(_URL + '&location=Denver');
  return this.http.get(URL + '&location=' + food_name);
}

}
