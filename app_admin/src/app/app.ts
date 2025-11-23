import { Component } from '@angular/core';
import { TripListingComponent } from './trip-listing/trip-listing';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TripListingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}
