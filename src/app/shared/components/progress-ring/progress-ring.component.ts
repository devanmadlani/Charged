import { Component, computed, input, output, inject } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import * as Icons from '@hugeicons/core-free-icons';
import {
  PROGRESS_RING_CONFIG,
  calculateCircumference,
} from './progress-ring.constants';
import { ProgressColorsService } from '@app-core';

@Component({
  selector: 'app-progress-ring',
  standalone: true,
  templateUrl: './progress-ring.component.html',
  styleUrls: ['./progress-ring.component.scss'],
  imports: [HugeiconsIconComponent],
})
export class ProgressRingComponent {
  private readonly colorsService = inject(ProgressColorsService);

  progress = input<number>(0);
  label = input<string | number>('');
  selected = input<boolean>(false);
  disabled = input<boolean>(false);

  selectedChange = output<void>();

  readonly radius = PROGRESS_RING_CONFIG.RADIUS;
  readonly strokeWidth = PROGRESS_RING_CONFIG.STROKE_WIDTH;
  readonly center = PROGRESS_RING_CONFIG.CENTER;
  readonly circumference = calculateCircumference(this.radius);

  readonly dashArray = computed(() => {
    const val = Math.min(100, Math.max(0, this.progress()));
    const dash = (val / 100) * this.circumference;
    return `${dash} ${this.circumference}`;
  });

  readonly colors = computed(() =>
    this.colorsService.getColors(this.progress(), this.disabled())
  );

  readonly baseRingColor = computed(() => this.colors().background);
  readonly progressColor = computed(() => this.colors().progress);

  readonly labelColor = computed(() =>
    this.selected()
      ? PROGRESS_RING_CONFIG.SELECTED_COLOR
      : PROGRESS_RING_CONFIG.DEFAULT_LABEL_COLOR
  );

  readonly isNumberLabel = computed(() => {
    const value = this.label();
    return typeof value === 'number' || !isNaN(Number(value));
  });

  readonly resolvedIcon = computed(() => {
    const name = this.label();
    if (typeof name !== 'string') return undefined;
    return (Icons as Record<string, any>)[name];
  });

  onClick(): void {
    if (!this.disabled()) {
      this.selectedChange.emit();
    }
  }
}
