// FILE: app_admin/src/app/edit-trip/edit-trip.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDataService } from '../data/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html'
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private trips: TripDataService
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code') ?? '';
    if (!code) { this.router.navigate(['']); return; }

    this.editForm = this.fb.group({
      _id: [],
      code: [code, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.trips.getTrip(code).subscribe({
      next: (value: any) => {
        const rec = Array.isArray(value) ? value[0] : value;
        if (rec?.start) rec.start = String(rec.start).slice(0, 10);
        this.editForm.patchValue(rec || {});
      },
      error: (e) => console.error('Load failed', e)
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.trips.updateTrip(this.editForm.value).subscribe({
        next: () => this.router.navigate(['']),
        error: (e) => console.error('Update failed', e)
      });
    }
  }
}
