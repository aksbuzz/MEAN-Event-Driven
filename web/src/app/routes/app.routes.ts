import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { RegisterComponent } from '../register/register.component';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent },
];
