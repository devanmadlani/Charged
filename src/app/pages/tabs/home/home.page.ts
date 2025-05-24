import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonContent,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { LineChartComponent, ScoreProgressBarComponent } from '@shared';
import { ScanCardGridComponent } from 'app/features/scan-card-grid/scan-card-grid.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonAvatar,
    IonLabel,
    IonRow,
    IonContent,
    CommonModule,
    FormsModule,
    TranslateModule,
    ScoreProgressBarComponent,
    ScanCardGridComponent,
    LineChartComponent,
  ],
})
export class HomePage {
  data = [
    { label: 'Self', progress: 10, url: '/self' },
    {
      label: 'Health',
      progress: 0,
      iconLabel: 'heart-outline',
      url: '/health',
    },
    { label: 'Sleep', progress: 0, iconLabel: 'heart-outline', disabled: true },
    {
      label: 'DNA',
      progress: 0,
      iconLabel: 'heart-outline',
      disabled: true,
    },
    { label: 'Blood', progress: 0, iconLabel: 'heart-outline', disabled: true },
  ];
}
