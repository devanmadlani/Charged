import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonCard,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
  IonIcon,
} from '@ionic/angular/standalone';
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
    IonIcon,
    IonText,
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

  private router = inject(Router);

  onCardClick(card: ScanCard): void {
    if (!card.disabled && card.url) {
      this.router.navigateByUrl(card.url);
    }
  }
}
