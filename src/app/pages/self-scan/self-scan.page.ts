import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ScoreProgressBarComponent } from '@shared';
import { ScanAccordionListComponent } from '../../features/scan-accordion-list/scan-accordion-list.component';

@Component({
  selector: 'app-self-scan',
  templateUrl: './self-scan.page.html',
  styleUrls: ['./self-scan.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    ScoreProgressBarComponent,
    ScanAccordionListComponent,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonHeader,
  ],
})
export class SelfScanPage {
  ArrowLeft02Icon = ArrowLeft02Icon;
}
