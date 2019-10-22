import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router'
import 'bootstrap/dist/js/bootstrap.bundle'; 
import { fakeBackendProvider } from './_helpers';
import {routing} from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
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
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards';
import {AlertComponent} from './_components';
import { CatalogService } from './catalog/catalog.service';
import { QueueService } from './catalog/queue.service';
import { ScheduleService } from './schedule/schedule.service';


@NgModule({
  declarations: [
    AppComponent,  WelcomeComponent, RegisterComponent, LoginComponent,AlertComponent,
    PageNotFoundComponent, UnderConstructionComponent, NavigationComponent,
    BrowseRecipeComponent, CreateRecipeComponent,
    CreateScheduleComponent, BrowseScheduleComponent, CatalogComponent,
    BrowseGroceriesComponent, CreateGroceriesComponent,
     CreateFeedbackComponent, BrowseFeedbackComponent 
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,routing,HttpClientModule,FormsModule
  ], 

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
fakeBackendProvider,
CatalogService,QueueService, ScheduleService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
