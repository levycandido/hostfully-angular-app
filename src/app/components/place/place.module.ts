import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePlaceComponent } from './create-place/create-place.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';
import { ViewPlaceComponent } from './view-place/view-place.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    CreatePlaceComponent,
    EditPlaceComponent,
    ViewPlaceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule
  ]
})
export class PlaceModule { }
