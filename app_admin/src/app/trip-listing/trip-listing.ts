import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../data/trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
})
export class TripListingComponent {
  trips: any[] = [];
  loading = true;

  constructor(private tripService: TripDataService) {}

  ngOnInit(): void {
    this.tripService.getTrips().subscribe({
      next: (data: any[]) => {
        console.log('Trips received from service:', data);
        this.trips = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error retrieving trips:', err);
        this.loading = false;
      }
    });
  }
}
