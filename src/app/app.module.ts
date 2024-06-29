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
import {MapComponent} from "./map/map.component";
import {MatNativeDateModule} from "@angular/material/core";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./auth.guard";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import {RegisterComponent} from "./auth/components/register/register.component";
import {DashboardComponent} from "./auth/components/dashboard/dashboard.component";
import { ReservationComponent } from './reservation/reservation.component';
import { PersonBookingsComponent } from './person-bookings/person-bookings.component';
import {LoginComponent} from "./auth/components/login/login-component.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";

const routes: Routes = [
  { path: '', component: SearchPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "signup", component: RegisterComponent },
  { path: 'person-bookings', component: PersonBookingsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    SearchPageComponent,
    MapComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ReservationComponent,
    PersonBookingsComponent
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
    RouterModule.forRoot(routes)
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
