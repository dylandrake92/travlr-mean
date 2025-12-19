// FILE: app_admin/src/app/login/login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../data/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  error = '';
  form!: FormGroup; // why: initialize in ctor to avoid TS2729

  constructor(private fb: FormBuilder, private http: HttpClient, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['admin@example.com', [Validators.required, Validators.email]],
      password: ['admin123', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.error = '';
    this.http.post<{token: string}>('/api/login', this.form.value).subscribe({
      next: (res) => { this.auth.login(res.token); this.router.navigateByUrl('/'); },
      error: () => this.error = 'Invalid email or password'
    });
  }
}
