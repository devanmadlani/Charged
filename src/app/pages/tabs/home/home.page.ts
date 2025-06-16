import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonCol,
  IonContent,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import {
  ScanCardListItemComponent,
  ScanCardListItemData,
  ScoreProgressBarComponent,
} from '@shared';
import {
  HOME_SCAN_CARDS,
  COMING_SOON_ITEMS,
  ComingSoonItem,
} from './home.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonAvatar,
    IonItem,
    IonLabel,
    IonRow,
    IonContent,
    IonText,
    CommonModule,
    FormsModule,
    TranslateModule,
    HugeiconsIconComponent,
    ScoreProgressBarComponent,
    ScanCardListItemComponent,
  ],
})
export class HomePage {
  scanCardData: ScanCardListItemData[] = HOME_SCAN_CARDS;
  comingSoonItems: ComingSoonItem[] = COMING_SOON_ITEMS;

  onScanCardClick(data: ScanCardListItemData): void {
    console.log('Scan card clicked:', data);
  }
}
