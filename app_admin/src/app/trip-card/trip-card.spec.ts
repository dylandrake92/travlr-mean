import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="trip-card" style="padding:15px; border:1px solid #ccc; margin-bottom: 10px;">
      <h3>{{ trip.name }}</h3>
      <p><strong>Code:</strong> {{ trip.code }}</p>
      <p><strong>Length:</strong> {{ trip.length }}</p>
      <p><strong>Start:</strong> {{ trip.start }}</p>
      <p><strong>Resort:</strong> {{ trip.resort }}</p>
      <p><strong>Price:</strong> {{ trip.perPerson | currency:'USD' }}</p>
      <p><strong>Description:</strong> {{ trip.description }}</p>
    </div>
  `
})
export class TripCardComponent {
  @Input() trip: any;
}
