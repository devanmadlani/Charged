import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TYPEFORM_FORMS } from '@app-core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { SurveyComponent } from '@shared';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  checkmarkCircleOutline,
  personOutline,
} from 'ionicons/icons';

export enum OnboardingStep {
  One,
  Two,
  Three,
  Final,
}

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
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
  ],
})
export class OnboardingPage {
  OnboardingStep = OnboardingStep;
  currentStep = signal(OnboardingStep.One);
  TYPEFORM_FORMS = TYPEFORM_FORMS;

  readonly stepsOrder = [
    OnboardingStep.One,
    OnboardingStep.Two,
    OnboardingStep.Three,
    OnboardingStep.Final,
  ];

  currentStepIndex = computed(() =>
    this.stepsOrder.indexOf(this.currentStep())
  );

  progress = computed(
    () => (this.currentStepIndex() + 1) / this.stepsOrder.length
  );

  constructor(private router: Router) {
    addIcons({ arrowBackOutline, personOutline, checkmarkCircleOutline });
  }

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
}
