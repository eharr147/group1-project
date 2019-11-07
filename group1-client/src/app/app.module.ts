import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router'
import 'bootstrap/dist/js/bootstrap.bundle'; 
//import { fakeBackendProvider } from './_helpers';
import {routing} from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';

/* Angular Material stuff, so all forms can work */
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatButtonModule} from '@angular/material';
/* End Angular Material imports */


import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowseRecipeComponent } from './recipes/browse-recipe.component';
import { CreateRecipeComponent } from './recipes/create-recipe.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ViewCatalogComponent } from './catalog/view-catalog.component'
import { BrowseScheduleComponent } from './schedule/browse-schedule.component';
import { CreateScheduleComponent } from './schedule/create-schedule.component';
import { EditScheduleComponent } from './schedule/edit-schedule.component';
import { BrowseGroceriesComponent } from './groceries/browse-groceries.component';
import { CreateGroceriesComponent } from './groceries/create-groceries.component';
import { CreateGroceryListComponent } from './groceries/create-grocery-list/create-grocery-list.component';
import { CreateFeedbackComponent } from './feedback/create-feedback.component';
import { BrowseFeedbackComponent } from './feedback/browse-feedback.component';
import { ListFeedbackComponent } from './feedback/list-feedback.component';

/* Login and Authentication imports */
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards';
import {AlertComponent} from './_components';
/* End Login and Authentication imports */

/* Application features service modules */
import { CatalogService } from './catalog/catalog.service';
import { QueueService } from './catalog/queue.service';
import { ScheduleService } from './schedule/schedule.service';
import {GroceryService} from './groceries/grocery.service';
import {FeedbackService} from './feedback/feedback.service';
import { RecipeService} from './recipes/recipe.service';
/* Authentication services */
import { fakeBackendProvider } from './_helpers';
//import {UserService} from  './_services' 
//import {AuthenticationService} from  './_services' 

/* end of service imports */



@NgModule({
  declarations: [
    AppComponent,  WelcomeComponent, RegisterComponent, LoginComponent,AlertComponent,
    PageNotFoundComponent, UnderConstructionComponent, NavigationComponent,
    BrowseRecipeComponent, CreateRecipeComponent,
    CreateScheduleComponent, BrowseScheduleComponent, EditScheduleComponent,
    CatalogComponent, ViewCatalogComponent,
    BrowseGroceriesComponent, CreateGroceriesComponent, CreateGroceryListComponent,
     CreateFeedbackComponent, BrowseFeedbackComponent, ListFeedbackComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,routing,HttpClientModule,FormsModule, NoopAnimationsModule,
    MatFormFieldModule,MatInputModule,MatButtonModule
  ], 

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
//fakeBackendProvider,
//UserService, AuthenticationService,
CatalogService,QueueService, ScheduleService,
GroceryService,
FeedbackService,
RecipeService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
