import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './home';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { CatalogComponent } from './catalog/catalog.component';
import { ViewCatalogComponent} from './catalog/view-catalog.component'

import { BrowseScheduleComponent } from './schedule/browse-schedule.component';
import { CreateScheduleComponent } from './schedule/create-schedule.component';
import { EditScheduleComponent } from './schedule/edit-schedule.component'; 

import { BrowseGroceriesComponent } from './groceries/browse-groceries.component';
import { CreateGroceriesComponent } from './groceries/create-groceries.component';

import { CreateFeedbackComponent } from './feedback/create-feedback.component';
import { BrowseFeedbackComponent } from './feedback/browse-feedback.component';
import {ListFeedbackComponent} from './feedback/list-feedback.component';

import { BrowseRecipeComponent } from './recipes/browse-recipe.component';
import { CreateRecipeComponent } from './recipes/create-recipe.component';
import { GetNutritionComponent } from './nutrition/get-nutrition.component';
import { GetNutritionDetailComponent } from './nutrition/get-nutrition-detail.component';

const appRoutes: Routes = [
    { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},

    {path: 'recipes-browse', component: BrowseRecipeComponent},
    {path: 'recipes-create', component: CreateRecipeComponent},

    {path: 'feedback-browse', component: BrowseFeedbackComponent},
    //{path: 'feedback-create', component: CreateFeedbackComponent}, remove direct route to Feedback creation

    {path:'feedback-create/:recipeId/:recipeTitle',component:CreateFeedbackComponent},

    {path: 'list-feedback',component:ListFeedbackComponent},
    {path:'list-feedback/:Recipeno',component:ListFeedbackComponent},
    {path: 'edit-feedback/:_id',component:CreateFeedbackComponent},

    {path: 'schedule-browse', component: BrowseScheduleComponent},
    {path: 'schedule-create', component: CreateScheduleComponent},
    {path: 'schedule-edit/:_id', component: EditScheduleComponent}, 

    {path: 'catalog-browse', component: CatalogComponent},
    {path: 'catalog-view/:_id', component: ViewCatalogComponent}, 
    {path: 'catalog-browse/:_return', component: CatalogComponent}, 

    {path: 'nutrition-get', component: GetNutritionComponent},
    {path: 'nutrition-detail/:_id', component: GetNutritionDetailComponent},

    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path: 'groceries-browse', component: BrowseGroceriesComponent},
    {path: 'groceries-create', component: CreateGroceriesComponent},
    /* 404 and redirection */
    {path: 'welcome', component: WelcomeComponent , canActivate: [AuthGuard]},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);