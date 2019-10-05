import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router'
import 'bootstrap/dist/js/bootstrap.bundle'; 

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { CreateScheduleComponent } from './schedule/create-schedule.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowseRecipeComponent } from './recipes/browse-recipe.component';
import { CreateRecipeComponent } from './recipes/create-recipe.component';
import { CatalogSearchComponent } from './catalog/catalog-search.component';
import { BrowseScheduleComponent } from './schedule/browse-schedule.component';
import { BrowseGroceriesComponent } from './groceries/browse-groceries.component';
import { CreateGroceriesComponent } from './groceries/create-groceries.component';
import { CreateFeedbackComponent } from './feedback/create-feedback.component';
import { BrowseFeedbackComponent } from './feedback/browse-feedback.component';

@NgModule({
  declarations: [
    AppComponent,  WelcomeComponent, 
    PageNotFoundComponent, UnderConstructionComponent, NavigationComponent,
    BrowseRecipeComponent, CreateRecipeComponent,
    CatalogSearchComponent,
    BrowseScheduleComponent, CreateScheduleComponent, 
    BrowseGroceriesComponent, CreateGroceriesComponent, CreateFeedbackComponent, BrowseFeedbackComponent

  ],
  imports: [
    BrowserModule,ReactiveFormsModule,
    RouterModule.forRoot(
      [
      {path: 'recipes-browse', component: BrowseRecipeComponent},
      {path: 'recipes-create', component: CreateRecipeComponent},
 
      {path: 'feedback-browse', component: BrowseFeedbackComponent},
      {path: 'feedback-create', component: CreateFeedbackComponent},

      {path: 'schedule-browse', component: BrowseScheduleComponent},
      {path: 'schedule-create', component: CreateScheduleComponent},
      {path: 'catalog-search', component: CatalogSearchComponent},

      {path: 'groceries-browse', component: BrowseGroceriesComponent},
      {path: 'groceries-create', component: CreateGroceriesComponent},
      /* 404 and redirection */
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent},
     /* {path: '', redirectTo: 'welcome', pathMatch: 'full'} */

      ]
      , {useHash: false})
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
