import { Component, OnInit, inject, input } from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonIcon,
  IonItem,
  IonLabel,
  IonBadge,
} from '@ionic/angular/standalone';
import { LineChartComponent } from '@shared';
import { TranslateModule } from '@ngx-translate/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { FireIcon, Brain02Icon, HomeIcon } from '@hugeicons/core-free-icons';
import { ProgressColorsService } from '@app-core';

export interface ScanAccordionItem {
  label: string;
  icon: any;
  progress: number;
  diff: number;
  disabled: boolean;
  description?: string;
  differenceLabel?: string;
  chartData?: Array<{ date: Date; value: number }>;
}

@Component({
  selector: 'app-scan-accordion-list',
  standalone: true,
  templateUrl: './scan-accordion-list.component.html',
  styleUrls: ['./scan-accordion-list.component.scss'],
  imports: [
    IonLabel,
    IonIcon,
    IonItem,
    IonAccordion,
    IonAccordionGroup,
    IonBadge,
    LineChartComponent,
    TranslateModule,
    HugeiconsIconComponent,
  ],
})
export class ScanAccordionListComponent implements OnInit {
  title = input<string>('Habit');
  data = input<ScanAccordionItem[]>([
    {
      label: 'SCAN_ACCORDION.MOVEMENT',
      icon: FireIcon,
      progress: 79,
      diff: 2,
      disabled: false,
      description: 'SCAN_ACCORDION.MOVEMENT_DESCRIPTION',
      chartData: [
        { date: new Date(2025, 6), value: 84 },
        { date: new Date(2025, 7), value: 86 },
        { date: new Date(2025, 8), value: 89 },
        { date: new Date(2025, 9), value: 95 },
      ],
    },
    {
      label: 'SCAN_ACCORDION.NUTRITION',
      icon: Brain02Icon,
      progress: 64,
      diff: -2,
      disabled: false,
      description: 'SCAN_ACCORDION.NUTRITION_DESCRIPTION',
      chartData: [
        { date: new Date(2025, 6), value: 66 },
        { date: new Date(2025, 7), value: 64 },
        { date: new Date(2025, 8), value: 62 },
        { date: new Date(2025, 9), value: 64 },
      ],
    },
    {
      label: 'SCAN_ACCORDION.MINDSET',
      icon: HomeIcon,
      progress: 85,
      diff: 3,
      disabled: false,
      description: 'SCAN_ACCORDION.MINDSET_DESCRIPTION',
      chartData: [
        { date: new Date(2025, 6), value: 82 },
        { date: new Date(2025, 7), value: 83 },
        { date: new Date(2025, 8), value: 84 },
        { date: new Date(2025, 9), value: 85 },
      ],
    },
  ]);

  private readonly progressColorsService = inject(ProgressColorsService);

  ngOnInit() {}

  /**
   * Get badge color based on progress value using the same rules as progress ring
   */
  getBadgeColor(progress: number): string {
    const colors = this.progressColorsService.getColors(progress, false);
    return colors.progress;
  }
}
