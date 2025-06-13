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
import { WeekTrackerComponent } from '@shared';
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
    WeekTrackerComponent,
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  isLoading = false;
  message = '';
  private router = inject(Router);

  weekTrackerData: any = {
    title: 'Morning walk',
    weeklyGoal: 5,
    currentProgress: 0,
    buildPhase: 'Build phase 2/4',
    iconType: 'droplet',
  };

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

  onDayToggled(event: { day: any; allDays: any[] }) {
    console.log('Day toggled:', event.day);
    console.log('All days:', event.allDays);
  }
}
