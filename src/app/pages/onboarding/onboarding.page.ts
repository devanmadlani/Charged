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

export enum OnboardingStep {
  One = 'first',
  Two = 'second',
  Three = 'third',
  Four = 'fo',
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
  email = '';
  message = '';
  isLoading = false;

  readonly stepsOrder = [
    OnboardingStep.One,
    OnboardingStep.Two,
    OnboardingStep.Three,
    OnboardingStep.Four,
    OnboardingStep.Final,
  ];

  currentStepIndex = computed(() =>
    this.stepsOrder.indexOf(this.currentStep())
  );

  progress = computed(
    () => (this.currentStepIndex() + 1) / this.stepsOrder.length
  );

  private router = inject(Router);

  next() {
    if (this.currentStepIndex() < this.stepsOrder.length - 1) {
      this.currentStep.set(this.stepsOrder[this.currentStepIndex() + 1]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  previous() {
    if (this.currentStepIndex() > 0) {
      this.currentStep.set(this.stepsOrder[this.currentStepIndex() - 1]);
    }
  }

  skip() {
    this.router.navigate(['/login']);
  }

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
