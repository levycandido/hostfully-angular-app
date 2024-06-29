import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Place} from "../../../models/Place";
import {PlaceService} from "../../../services/PlaceService";

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.scss']
})
export class EditPlaceComponent implements OnInit {
  place: Place = { name: '', street: '' };
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.placeService.getPlace(this.id).subscribe((data: Place) => {
      this.place = data;
    });
  }

  onSubmit() {
    this.placeService.updatePlace(this.id, this.place).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
