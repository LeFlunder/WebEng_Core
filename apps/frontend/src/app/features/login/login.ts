import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <h1>Login</h1>
    <input [(ngModel)]="identifier" placeholder="Email or Username" type="email" />
    <input [(ngModel)]="password" placeholder="Passwort" type="password" />
    <button (click)="submit()">Anmelden</button>
    <button (click)="auth.loginOrRegisterWithGoogle()">Mit Google anmelden</button>
    <a routerLink="/register">Noch kein Konto? Registrieren</a>

    @if (error()) {
      <p style="color:red">{{ error() }}</p>
    }
    @if (auth.user(); as u) {
      <p>Eingeloggt als {{ u.email }}</p>
    }
  `,
})
export class Login {
  protected auth = inject(Auth);
  private readonly router = inject(Router);
  identifier = '';
  password = '';
  error = signal<string | null>(null);

  submit(): void {
    this.error.set(null);
    this.auth.login(this.identifier, this.password).subscribe({
      next: (res) => this.auth.user.set(res),
      error: () => this.error.set('Login fehlgeschlagen'),
    });
  }
}
