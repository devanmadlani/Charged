import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { ArrowRight01Icon, SquareLock02Icon } from '@hugeicons/core-free-icons';
import { IonCard, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { ProgressRingComponent } from '@shared';

// TODO: move this to models file

export interface ScanCard {
  label: string;
  progress: number;
  iconLabel?: string;
  disabled?: boolean;
  url?: string;
}

@Component({
  selector: 'app-scan-card-grid',
  standalone: true,
  templateUrl: './scan-card-grid.component.html',
  styleUrls: ['./scan-card-grid.component.scss'],
  imports: [
    HugeiconsIconComponent,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    ProgressRingComponent,
  ],
})
export class ScanCardGridComponent {
  data = input<any[]>();
  test: any;
  SquareLock02Icon = SquareLock02Icon;
  ArrowRight01Icon = ArrowRight01Icon;

  private router = inject(Router);

  onCardClick(card: ScanCard): void {
    if (!card.disabled && card.url) {
      this.router.navigateByUrl(card.url);
    }
  }
}

// mock data for the scan card grid
// data = [
//   { label: 'Self', progress: 10, url: '/self-scan' },
//   {
//     label: 'Health',
//     progress: 90,
//     iconLabel: 'HealthIcon',
//     url: '/health',
//   },
//   {
//     label: 'Sleep',
//     progress: 50,
//     iconLabel: 'SleepingIcon',
//     disabled: false,
//   },
//   {
//     label: 'DNA',
//     progress: 0,
//     iconLabel: 'Dna01Icon',
//     disabled: true,
//   },
//   { label: 'Blood', progress: 0, iconLabel: 'LabsIcon', disabled: true },
// ];
