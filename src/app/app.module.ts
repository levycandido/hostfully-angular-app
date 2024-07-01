import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {AppComponent} from './app.component';
import {TopMenuComponent} from "./top-menu/top-menu.component";
import {RouterModule, Routes} from "@angular/router";
import {SearchPageComponent} from "./search-page/search-page.component";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MapComponent} from "./components/map/map.component";
import {MatNativeDateModule} from "@angular/material/core";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./auth.guard";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import {RegisterComponent} from "./auth/components/register/register.component";
import { ReservationComponent } from './components/booking/reservation/reservation.component';
import {LoginComponent} from "./auth/components/login/login-component.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {CreatePlaceComponent} from "./components/place/create-place/create-place.component";
import {PersonBookingsComponent} from "./components/booking/person-bookings/person-bookings.component";

const routes: Routes = [
  { path: '', component: SearchPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: "signup", component: RegisterComponent },
  { path: 'person-bookings', component: PersonBookingsComponent },
  { path:'create-place', component: CreatePlaceComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    SearchPageComponent,
    MapComponent,
    RegisterComponent,
    LoginComponent,
    ReservationComponent,
    PersonBookingsComponent,
    CreatePlaceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatMenuModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
