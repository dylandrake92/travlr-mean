// FILE: app_admin/src/app/data/trip-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trips';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  private readonly base = '/api/trips';
  constructor(private http: HttpClient) {}
  getTrips(): Observable<Trip[]> { return this.http.get<Trip[]>(this.base); }
  getTrip(code: string): Observable<Trip[] | Trip> { return this.http.get<Trip[] | Trip>(`${this.base}/${encodeURIComponent(code)}`); }
  addTrip(trip: Trip): Observable<any> { return this.http.post(this.base, trip); }
  updateTrip(trip: Trip): Observable<any> { return this.http.put(`${this.base}/${encodeURIComponent(trip.code)}`, trip); }
  deleteTrip(code: string): Observable<any> { return this.http.delete(`${this.base}/${encodeURIComponent(code)}`); }
}
