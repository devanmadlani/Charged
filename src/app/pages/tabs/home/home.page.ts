import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonCol,
  IonContent,
  IonLabel,
  IonRow,
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
    IonCol,
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
    { label: 'Self', progress: 10, url: '/self-scan' },
    {
      label: 'Health',
      progress: 90,
      iconLabel: 'HealthIcon',
      url: '/health',
    },
    {
      label: 'Sleep',
      progress: 50,
      iconLabel: 'SleepingIcon',
      disabled: false,
    },
    {
      label: 'DNA',
      progress: 0,
      iconLabel: 'Dna01Icon',
      disabled: true,
    },
    { label: 'Blood', progress: 0, iconLabel: 'LabsIcon', disabled: true },
  ];
}
