import { Component, input, output, EventEmitter, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Brain02Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { IonCard, IonItem, IonLabel, IonText } from '@ionic/angular/standalone';
import { ProgressRingComponent } from '../progress-ring/progress-ring.component';
import { TranslateModule } from '@ngx-translate/core';

export interface ScanCardListItemData {
  progress: number;
  title: string;
  description: string;
  date: string;
  dateLabel?: string;
  icon?: any;
  disabled?: boolean;
  url?: string;
}

@Component({
  selector: 'app-scan-card-list-item',
  templateUrl: './scan-card-list-item.component.html',
  styleUrls: ['./scan-card-list-item.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonItem,
    IonLabel,
    HugeiconsIconComponent,
    ProgressRingComponent,
    TranslateModule,
  ],
})
export class ScanCardListItemComponent {
  data = input<ScanCardListItemData>();

  cardClick = output<ScanCardListItemData>();

  Brain02Icon = Brain02Icon;
  ArrowRight01Icon = ArrowRight01Icon;

  private router = inject(Router);

  onCardClick(): void {
    const cardData = this.data();
    if (cardData && !cardData.disabled) {
      this.cardClick.emit(cardData);

      if (cardData.url) {
        this.router.navigateByUrl(cardData.url);
      }
    }
  }
}
