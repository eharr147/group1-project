import { Injectable } from '@angular/core';
import { IRecipe } from './recipe';
import {ISchedule} from '../schedule/schedule'

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  recipes: IRecipe[] = [];
  schedule: ISchedule = null;
  schedule_id: string = null;

  add(recipe: IRecipe) {
    this.recipes.push(recipe);
  }

  clear() {
    this.recipes = [];
    this.schedule=null;
  }

  remove(selIndex: number): void {
    this.recipes.splice(selIndex,1);
  }

  saveState(schedule: ISchedule, schedule_id: string) {
    this.schedule=schedule
    this.schedule_id = schedule_id

  }

  clearState() {
    this.schedule=null
    this.schedule_id=null

  }
}
