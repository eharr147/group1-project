import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './home';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { CreateScheduleComponent } from './schedule/create-schedule.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowseRecipeComponent } from './recipes/browse-recipe.component';
import { CreateRecipeComponent } from './recipes/create-recipe.component';
import { CatalogComponent } from './catalog/catalog.component';
import { BrowseScheduleComponent } from './schedule/browse-schedule.component';
import { BrowseGroceriesComponent } from './groceries/browse-groceries.component';
import { CreateGroceriesComponent } from './groceries/create-groceries.component';
import { CreateFeedbackComponent } from './feedback/create-feedback.component';
import { BrowseFeedbackComponent } from './feedback/browse-feedback.component';
const appRoutes: Routes = [
    { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    { path: 'register', component: RegisterComponent },
    {path: 'recipes-browse', component: BrowseRecipeComponent},
    {path: 'recipes-create', component: CreateRecipeComponent},

    {path: 'feedback-browse', component: BrowseFeedbackComponent},
    {path: 'feedback-create', component: CreateFeedbackComponent},

    {path: 'schedule-browse', component: BrowseScheduleComponent},
    {path: 'schedule-create', component: CreateScheduleComponent},
    {path: 'catalog-browse', component: CatalogComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path: 'groceries-browse', component: BrowseGroceriesComponent},
    {path: 'groceries-create', component: CreateGroceriesComponent},
    /* 404 and redirection */
    {path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);