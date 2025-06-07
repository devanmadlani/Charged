import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import Passwordless from 'supertokens-web-js/recipe/passwordless';
import { AuthService } from '@app-core';
import {
  IonSpinner,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: `
    <ion-header>
      <ion-toolbar><ion-title>Verifying Login</ion-title></ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-spinner name="crescent"></ion-spinner>
      <p>Signing you in...</p>
    </ion-content>
  `,
  imports: [
    IonSpinner,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class AuthVerifyPage implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  async ngOnInit() {
    try {
      const result = await Passwordless.consumeCode();

      if (result.status === 'OK') {
        const user = await this.authService.loadUserFromSession();

        if (user) {
          this.authService.setUser(user);
          const role = this.authService.userRole();
          const redirectTo = role === 'admin' ? '/admin' : '/tabs/home';
          this.router.navigateByUrl(redirectTo);
        } else {
          this.router.navigate(['/login'], {
            queryParams: { error: 'session-invalid' },
          });
        }
      } else {
        this.router.navigate(['/login'], {
          queryParams: { error: result.status },
        });
      }
    } catch (err) {
      console.error('Magic link verification failed:', err);
      this.router.navigate(['/login'], {
        queryParams: { error: 'invalid-link' },
      });
    }
  }
}
