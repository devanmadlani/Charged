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
  ],
})
export class SelfScanPage {
  ArrowLeft02Icon = ArrowLeft02Icon;
}
