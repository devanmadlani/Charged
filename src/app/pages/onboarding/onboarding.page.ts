import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TYPEFORM_FORMS } from '@app-core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import {
  AiScanIcon,
  ArrowLeft01Icon,
  MailAccount01Icon,
  Search02Icon,
  Sun03Icon,
  Tick01Icon,
} from '@hugeicons/core-free-icons';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonProgressBar,
  IonTitle,
  IonToolbar,
  IonText,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { SurveyComponent } from '@shared';
import Passwordless from 'supertokens-web-js/recipe/passwordless';

interface PasswordlessResponse {
  status: 'OK' | 'SIGN_IN_UP_NOT_ALLOWED' | string;
}

export enum OnboardingStep {
  One = 'first',
  Two = 'second',
  Three = 'third',
  Email = 'email',
  Four = 'fourth',
  Final = 'last',
}

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonItem,
    IonLabel,
    IonButton,
    IonProgressBar,
    IonButtons,
    IonContent,
    IonHeader,
    IonButtons,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    TranslateModule,
    SurveyComponent,
    IonInput,
    HugeiconsIconComponent,
  ],
})
export class OnboardingPage {
  OnboardingStep = OnboardingStep;
  currentStep = signal(OnboardingStep.One);
  TYPEFORM_FORMS = TYPEFORM_FORMS;
  AiScanIcon = AiScanIcon;
  Tick01Icon = Tick01Icon;
  ArrowLeft01Icon = ArrowLeft01Icon;
  Search02Icon = Search02Icon;
  MailAccount01Icon = MailAccount01Icon;
  Sun03Icon = Sun03Icon;
  email = signal('');
  message = signal('');
  isLoading = signal(false);
  emailError = signal('');

  readonly stepsOrder = [
    OnboardingStep.One,
    OnboardingStep.Two,
    OnboardingStep.Three,
    OnboardingStep.Email,
    OnboardingStep.Four,
    OnboardingStep.Final,
  ];

  currentStepIndex = computed(() =>
    this.stepsOrder.indexOf(this.currentStep())
  );

  progress = computed(
    () => (this.currentStepIndex() + 1) / this.stepsOrder.length
  );

  // Computed property to check if the current step can proceed
  canProceed = computed(() => {
    const step = this.currentStep();
    if (step === OnboardingStep.Email) {
      return this.email() && !this.emailError();
    }
    return true;
  });

  private router = inject(Router);

  /**
   * Proceeds to the next step in the onboarding flow
   */
  next() {
    if (this.currentStepIndex() < this.stepsOrder.length - 1) {
      this.currentStep.set(this.stepsOrder[this.currentStepIndex() + 1]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Goes back to the previous step in the onboarding flow
   */
  previous() {
    if (this.currentStepIndex() > 0) {
      this.currentStep.set(this.stepsOrder[this.currentStepIndex() - 1]);
    }
  }

  /**
   * Skips the onboarding flow and navigates to login
   */
  login() {
    this.router.navigate(['/login']);
  }

  /**
   * Validates email format using a simple regex pattern
   */
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Handles email input changes and validates the email
   */
  onEmailChange(email: string) {
    this.email.set(email);
    this.emailError.set('');

    if (email && !this.validateEmail(email)) {
      this.emailError.set('Please enter a valid email address');
    }
  }

  /**
   * Sends magic link for passwordless authentication
   */
  async sendMagicLink() {
    const emailValue = this.email();

    // Validate email before sending
    if (!emailValue) {
      this.emailError.set('Email is required');
      return;
    }

    if (!this.validateEmail(emailValue)) {
      this.emailError.set('Please enter a valid email address');
      return;
    }

    this.isLoading.set(true);
    this.message.set('');
    this.emailError.set('');

    try {
      const res = (await Passwordless.createCode({
        email: emailValue,
      })) as PasswordlessResponse;

      if (res.status === 'OK') {
        this.message.set('Magic link sent! Check your email.');
      } else if (res.status === 'SIGN_IN_UP_NOT_ALLOWED') {
        this.message.set('Error: Sign up is not allowed for this email.');
      } else {
        this.message.set(`Error: ${res.status}`);
      }
    } catch (err) {
      console.error('Magic link error:', err);
      this.message.set('Something went wrong. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
