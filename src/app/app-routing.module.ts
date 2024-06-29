import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import {AuthGuard} from "./auth.guard";
import {AdminComponent} from "./components/admin/admin.component";
import {LoginComponent} from "./components/admin/login/login.component";

const routes: Routes = [
  { path: '', component: SearchPageComponent },
  { path: '/search', component: SearchPageComponent },
  { path: '/login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
