import { Component, OnInit } from '@angular/core';
import { IRecipe } from '../shared/recipe';
import { CatalogService } from './catalog.service';
import { QueueService} from './queue.service'
import { Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {
  title = 'Recipe Catalog'
  /* Hold an array of Recipes */
  recipes: IRecipe[];
  filteredRecipes: IRecipe[];
 // selectedRecipes: IRecipe[] = [];
  
  listFilter: string

  constructor(private catalogService: CatalogService,
    public queueService: QueueService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getRecipes();
  }

    /* Replaced with observable
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }
  */
  getRecipes(): void {
    /* Initialize recipes property */
    this.catalogService.getRecipes()
        .subscribe(recipes => this.recipes = recipes);
    /* Initialize filteredRecipes property so template renders first time */
    this.catalogService.getRecipes()
        .subscribe(recipes => this.filteredRecipes = recipes);
  }

  addSelection(_id: number) {
 
    var toSelect = (this.recipes.findIndex(c => c._id == _id));
    this.queueService.add(this.recipes[toSelect]
//    this.selectedRecipes.push(
//      this.recipes[toSelect]
                  )
  }

  addSelectionAndFinish(_id: number) {
   this.addSelection(_id) 
   this.router.navigate(['/schedule-create'])
  }
  removeSelection(selIndex: number): void {
    this.queueService.remove(selIndex)
    //this.selectedRecipes.splice(selIndex);
  }
   goSchedule() {
    this.router.navigate(['/schedule-create'])
   }
   goScheduleBrowse() {
    this.router.navigate(['/schedule-browse'])
   }
}
