import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../shared.service";
import {Booking} from "../models/Booking";
import {NotificationService} from "../services/NotificationService";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  searchForm: FormGroup;
  latitude = -23.56448;
  longitude = -46.65882;
  zoom = 12;
  apiKey: string = 'AIzaSyCHn_9KVbUaENStQgJftgX6XArR2Zp2F1Q';

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private sharedService: SharedService,
              private notificationService: NotificationService) {
    this.searchForm = this.fb.group({
      location: ['', Validators.required],
      checkin: ['', Validators.required],
      checkout: ['', Validators.required],
      guests: ['', Validators.required]
    });
  }

  ngOnInit() {
   }

  onSubmit(): void {
    if (this.searchForm.valid) {
      const address = this.searchForm.get('location')?.value;
      this.geocodeAddress(address);
    } else {
      console.log('Form is invalid');
    }
  }

  geocodeAddress(address: string): void {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;

    this.http.get(url).subscribe((response: any) => {
      if (response.status === 'OK') {
        this.latitude = response.results[0].geometry.location.lat;
        this.longitude = response.results[0].geometry.location.lng;
        this.zoom = 12;
        this.sharedService.selectSearch(this.createBoockingSearch());
      } else {
        this.notificationService.showError('Geocode was not successful for the following reason: ' + response.status);
      }
    });
  }

  createBoockingSearch():Booking {
    return {
      status: undefined,
      guest: this.searchForm.get('guests')?.value,
      place: undefined,
      startDate: this.searchForm.get('checkin')?.value,
      endDate: this.searchForm.get('checkout')?.value
    };
  }
}
