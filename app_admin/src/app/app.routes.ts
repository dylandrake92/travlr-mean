import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing';
import { AddTripComponent } from './add-trip/add-trip';
import { EditTripComponent } from './edit-trip/edit-trip';
import { LoginComponent } from './login/login';
import { authGuard } from './data/auth.guard';

export const routes: Routes = [
  { path: '', component: TripListingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: AddTripComponent, canActivate: [authGuard] },
  { path: 'edit/:code', component: EditTripComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];