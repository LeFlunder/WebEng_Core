import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { ChooseUsername } from './features/choose-username/choose-username';
import { Layout } from './layout/layout';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { usernameGuard } from './core/guards/username.guard';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'register', component: Register, canActivate: [guestGuard] },
  { path: 'choose-username', component: ChooseUsername, canActivate: [authGuard, usernameGuard] },
  {
    path: '',
    component: Layout,
    canActivate: [],
    children: [],
  },
  { path: '**', redirectTo: 'login' },
];
