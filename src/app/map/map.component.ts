import {Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit} from '@angular/core';
import {PlaceService} from "../services/PlaceService";
import {catchError, mergeMap, tap} from "rxjs/operators";
import {Place} from "../models/Place";
import {from, of} from "rxjs";
import {SharedService} from "../shared.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() zoom: number;

  map!: google.maps.Map;

  constructor(private placeService: PlaceService,
              private sharedService: SharedService,
              private router: Router) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.latitude || changes.longitude || changes.zoom) {
      this.loadMap();
    }
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap(): void {
    if (this.isValidCoordinates(this.latitude, this.longitude) && this.isValidZoom(this.zoom)) {
      const mapProperties: google.maps.MapOptions = {
        center: new google.maps.LatLng(this.latitude, this.longitude),
        zoom: this.zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      const mapElement = document.getElementById('googleMap') as HTMLElement;
      if (mapElement) {
        this.map = new google.maps.Map(mapElement, mapProperties);

        // Recuperar e adicionar marcadores com RxJS
        this.placeService.getPlaces().pipe(
          mergeMap((places: Place[]) => from(places)),
          tap((place: Place) => {
            const markerPosition = new google.maps.LatLng(place.latitude, place.longitude);
            const marker = new google.maps.Marker({
              position: markerPosition,
              map: this.map,
              title: place.name
            });

            marker.addListener('click', () => {
              this.handleMarkerClick(place);
            });
          }),
          catchError(error => {
            console.error('Error loading places:', error);
            return of([]);
          })
        ).subscribe();

      } else {
        console.error('Map element not found');
      }
    } else {
      console.error('Invalid map properties: latitude, longitude and zoom must be valid numbers');
    }
  }

  handleMarkerClick(place: Place): void {
    this.sharedService.selectPlace(place);
    this.router.navigate(['/reservation']);
  }


  isValidCoordinates(lat: number, lng: number): boolean {
    return !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  }


  isValidZoom(zoom: number): boolean {
    return !isNaN(zoom) && zoom >= 0 && zoom <= 21;
  }
}
