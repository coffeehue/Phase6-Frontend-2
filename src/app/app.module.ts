import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { RouterModule, Routes} from "@angular/router"
import { FormsModule} from "@angular/forms";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { ShowmoviesComponent } from './components/showmovies/showmovies.component';
import { AddtocartmovieComponent } from './components/addtocartmovie/addtocartmovie.component';
import { LoginComponent } from './components/login/login.component';
import { SignoutComponent } from './components/signout/signout.component';
import { AccordionModule } from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { RegisterComponent } from './components/register/register.component';
import {DataViewModule} from 'primeng/dataview';
import { TrialngComponent } from './components/trialng/trialng.component';


import {DataTablesModule} from 'angular-datatables';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {PasswordModule} from 'primeng/password';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TabViewModule} from 'primeng/tabview';
import { DividerModule } from "primeng/divider";

import { AuthguardService } from './authguard.service';
import {AuthenticationGuard} from './authentication.guard';
import { LogoutComponent } from './logout/logout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ListBookingsComponent } from './components/list-bookings/list-bookings.component';
import { ListFoodComponent } from './components/list-food/list-food.component';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { AddtocartFoodComponent } from './components/addtocart-food/addtocart-food.component';
import { ShowfoodComponent } from './components/showfood/showfood.component';

const routers: Routes = [
  {path: 'movies', component: ListMoviesComponent,canActivate:[AuthenticationGuard]},
  {path: 'addmovie', component: AddMovieComponent,canActivate:[AuthenticationGuard]},
  {path: 'editmovies/:id', component: AddMovieComponent,canActivate:[AuthenticationGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'showmovies', component: ShowmoviesComponent,canActivate:[AuthenticationGuard]},
  {path: 'bookmovie/:id', component: AddtocartmovieComponent,canActivate:[AuthenticationGuard]},
  {path: 'logout', component: SignoutComponent,canActivate:[AuthenticationGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'payment', component: PaymentComponent,canActivate:[AuthenticationGuard]},
  {path: 'bookings', component: ListBookingsComponent,canActivate:[AuthenticationGuard]},
  {path: 'showfood', component: ListFoodComponent},
  {path: 'addfood', component: AddFoodComponent},
  {path: 'editfood/:id', component: AddFoodComponent},
  {path: 'order', component: ShowfoodComponent},
  
];

@NgModule({
  declarations: [
    AppComponent,
    ListMoviesComponent,
    AddMovieComponent,
    ShowmoviesComponent,
    AddtocartmovieComponent,
    LoginComponent,
    RegisterComponent,
    TrialngComponent,
    LogoutComponent,
    SignoutComponent,
    PaymentComponent,
    ListBookingsComponent,
    ListFoodComponent,
    AddFoodComponent,
    AddtocartFoodComponent,
    ShowfoodComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routers),
    FormsModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    DataViewModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    RatingModule,
    RippleModule,
    DataTablesModule,
    CheckboxModule,
    RadioButtonModule,
    TabViewModule,
    BrowserAnimationsModule,
    PasswordModule,
    DividerModule
 
  ],
  exports:[RouterModule],
  providers: [AuthguardService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
