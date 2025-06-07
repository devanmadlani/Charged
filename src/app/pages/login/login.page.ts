import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import Passwordless from 'supertokens-web-js/recipe/passwordless';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonText,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  isLoading = false;
  message = '';
  private router = inject(Router);

  async sendMagicLink() {
    this.isLoading = true;
    this.message = '';
    try {
      const res = await Passwordless.createCode({ email: this.email });
      this.message =
        res.status === 'OK'
          ? 'Magic link sent! Check your email.'
          : `Error: ${res.status}`;
    } catch (err) {
      console.error('Magic link error:', err);
      this.message = 'Something went wrong. Try again.';
    }
    this.isLoading = false;
  }
}
