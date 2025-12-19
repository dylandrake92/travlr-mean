// FILE: app_admin/src/app/add-trip/add-trip.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../data/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrls: ['./add-trip.css']
})
export class AddTripComponent implements OnInit {
  addForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private trips: TripDataService) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.trips.addTrip(this.addForm.value).subscribe({
        next: () => this.router.navigate(['']),
        error: (e) => console.error('Add failed', e)
      });
    }
  }
}
