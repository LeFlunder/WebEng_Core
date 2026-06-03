import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/auth/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <h1>Registrieren</h1>
    <input [(ngModel)]="username" placeholder="Benutzername" type="text" />
    <input [(ngModel)]="email" placeholder="Email" type="email" />
    <input [(ngModel)]="password" placeholder="Passwort" type="password" />
    <button (click)="submit()">Registrieren</button>
    <button (click)="auth.loginOrRegisterWithGoogle()">Mit Google registrieren</button>
    <a routerLink="/login">Bereits ein Konto? Anmelden</a>

    @if (error()) {
      <p style="color:red">{{ error() }}</p>
    }
  `,
})
export class Register {
  protected auth = inject(Auth);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  username = '';
  email = '';
  password = '';
  error = signal<string | null>(null);

  submit(): void {
    this.error.set(null);
    this.http
      .post(`${environment.apiUrl}/auth/register`, {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: () => this.error.set('Registrierung fehlgeschlagen'),
      });
  }
}
