import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/auth/auth';

@Component({
  selector: 'app-choose-username',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h1>Benutzername wählen</h1>
    <p>Du hast dich mit Google angemeldet. Bitte wähle einen Benutzernamen.</p>
    <input [(ngModel)]="username" placeholder="Benutzername" type="text" [disabled]="loading()" />
    <button (click)="submit()" [disabled]="!username.trim() || loading()">Bestätigen</button>
    <button (click)="skip()" [disabled]="loading()">Später</button>

    @if (error()) {
      <p style="color:red">{{ error() }}</p>
    }
  `,
})
export class ChooseUsername {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  username = '';
  loading = signal(false);
  error = signal<string | null>(null);

  skip(): void {
    void this.router.navigate(['/']);
  }

  submit(): void {
    const trimmed = this.username.trim();
    if (!trimmed) return;

    this.loading.set(true);
    this.error.set(null);

    this.auth.setUsername(trimmed).subscribe({
      next: (user) => {
        this.auth.user.set(user);
        void this.router.navigate(['/']);
      },
      error: () => {
        this.error.set('Benutzername bereits vergeben oder ungültig.');
        this.loading.set(false);
      },
    });
  }
}
