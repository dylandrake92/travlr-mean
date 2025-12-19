// FILE: app_admin/src/app/trip-listing/trip-listing.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TripDataService } from '../data/trip-data.service';
import { Trip } from '../data/trips';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { AuthService } from '../data/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, RouterLink, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css']
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  loading = true;
  message = '';

  constructor(private tripData: TripDataService, public auth: AuthService) {}

  ngOnInit(): void {
    this.tripData.getTrips()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          this.trips = Array.isArray(data) ? data : (data ? [data] : []);
          this.message = this.trips.length ? `There are ${this.trips.length} trips available.` : 'No trips found.';
        },
        error: () => this.message = 'Failed to load trips.'
      });
  }

  onDelete(code: string): void {
    if (!confirm('Delete this trip?')) return;
    this.tripData.deleteTrip(code).subscribe({
      next: () => this.trips = this.trips.filter(t => t.code !== code)
    });
  }
}
