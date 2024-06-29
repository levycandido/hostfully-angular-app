import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchPageComponent} from "./search-page.component";
import {MatDatepickerModule} from "@angular/material/datepicker";

const routes: Routes = [
  { path: 'search', component: SearchPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    MatDatepickerModule
  ]
})
export class SearchRoutingModule { }
