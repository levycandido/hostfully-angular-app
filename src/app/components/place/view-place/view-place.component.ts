import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Place} from "../../../models/Place";
import {PlaceService} from "../../../services/PlaceService";

@Component({
  selector: 'app-view-place',
  templateUrl: './view-place.component.html',
  styleUrls: ['./view-place.component.scss']
})
export class ViewPlaceComponent implements OnInit {
  place: Place | undefined;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.placeService.getPlace(id).subscribe((data: Place) => {
      this.place = data;
    });
  }

  onSubmit() {

  }
}
