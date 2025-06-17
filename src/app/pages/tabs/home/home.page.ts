import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import {
  ScanCardListItemComponent,
  ScanCardListItemData,
  ScoreProgressBarComponent,
} from '@shared';
import {
  COMING_SOON_ITEMS,
  ComingSoonItem,
  HOME_SCAN_CARDS,
} from './home.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonItem,
    IonLabel,
    IonContent,
    IonText,
    CommonModule,
    FormsModule,
    TranslateModule,
    HugeiconsIconComponent,
    ScoreProgressBarComponent,
    ScanCardListItemComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
  ],
})
export class HomePage {
  scanCardData: ScanCardListItemData[] = HOME_SCAN_CARDS;
  comingSoonItems: ComingSoonItem[] = COMING_SOON_ITEMS;

  onScanCardClick(data: ScanCardListItemData): void {
    console.log('Scan card clicked:', data);
  }
}
