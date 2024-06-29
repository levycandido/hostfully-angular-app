import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePlaceComponent } from './create-place/create-place.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';
import { ViewPlaceComponent } from './view-place/view-place.component';

const routes: Routes = [
  { path: 'places/create', component: CreatePlaceComponent },
  { path: 'places/edit/:id', component: EditPlaceComponent },
  { path: 'places/:id', component: ViewPlaceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceRoutingModule { }
