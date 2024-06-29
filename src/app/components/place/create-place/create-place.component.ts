import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import {Place} from "../../../models/Place";
import {PlaceService} from "../../../services/PlaceService";

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.scss']
})
export class CreatePlaceComponent implements OnInit {
  place: Place = {
    name: '',
    street: ''
  };

  constructor(private placeService: PlaceService, private snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.placeService.addPlace(this.place).subscribe({
        next: (response) => {
          this.snackBar.open('Place created successfully!', 'Close', {
            duration: 3000,
          });
          form.resetForm();
        },
        error: (err) => {
          this.snackBar.open(`Error: ${err.message}`, 'Close', {
            duration: 3000,
          });
        }
      });
    }
  }
}
