import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import {
  IonAvatar,
  IonCol,
  IonContent,
  IonLabel,
  IonRow,
} from '@ionic/angular/standalone';
import { LineChartComponent, ScoreProgressBarComponent } from '@shared';
import { ScanAccordionListComponent } from '../../features/scan-accordion-list/scan-accordion-list.component';

@Component({
  selector: 'app-self-scan',
  templateUrl: './self-scan.page.html',
  styleUrls: ['./self-scan.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonLabel,
    IonAvatar,
    IonRow,
    IonContent,
    CommonModule,
    FormsModule,
    HugeiconsIconComponent,
    ScoreProgressBarComponent,
    LineChartComponent,
    ScanAccordionListComponent,
  ],
})
export class SelfScanPage {
  ArrowLeft02Icon = ArrowLeft02Icon;
}
