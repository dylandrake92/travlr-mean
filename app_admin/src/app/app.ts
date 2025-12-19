// FILE: app_admin/src/app/app.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // why: enables *ngIf
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './data/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav class="navbar navbar-default" style="padding:8px">
      <a class="navbar-brand" routerLink="">Travlr Admin</a>
      <span class="ms-auto">
        <a *ngIf="!auth.isLoggedIn()" routerLink="/login" class="btn btn-sm btn-outline-primary">Login</a>
        <button *ngIf="auth.isLoggedIn()" (click)="logout()" class="btn btn-sm btn-outline-secondary">Logout</button>
      </span>
    </nav>
    <div class="container" style="padding:12px">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}
  logout() { this.auth.logout(); this.router.navigateByUrl('/'); } // why: immediately clears auth state
}
