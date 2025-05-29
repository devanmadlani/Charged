import {
  Component,
  computed,
  EventEmitter,
  input,
  Output,
} from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import * as Icons from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-progress-ring',
  standalone: true,
  templateUrl: './progress-ring.component.html',
  styleUrls: ['./progress-ring.component.scss'],
  imports: [HugeiconsIconComponent],
})
export class ProgressRingComponent {
  progress = input<number>(0);
  label = input<string | number>('');
  selected = input<boolean>(false);
  disabled = input<boolean>(false);

  @Output() selectedChange = new EventEmitter<void>();

  readonly radius = 40;
  readonly strokeWidth = 8;
  readonly center = 50;
  readonly circumference = 2 * Math.PI * this.radius;

  readonly dashArray = computed(() => {
    const val = Math.min(100, Math.max(0, this.progress()));
    const dash = (val / 100) * this.circumference;
    return `${dash} ${this.circumference}`;
  });

  readonly baseRingColor = computed(() => {
    if (this.disabled()) return '#e0e0e0';

    const val = this.progress();
    if (val <= 40) return '#fdecea';
    if (val <= 70) return '#fff3e0';
    return '#e8f5e9';
  });

  readonly progressColor = computed(() => {
    const val = this.progress();
    if (val <= 40) return '#f44336';
    if (val <= 70) return '#ff9800';
    return '#4caf50';
  });

  readonly labelColor = computed(() => (this.selected() ? '#3880ff' : '#000'));

  readonly isNumberLabel = computed(() => {
    const value = this.label();
    return typeof value === 'number' || !isNaN(Number(value));
  });

  readonly resolvedIcon = computed(() => {
    const name = this.label();
    return (Icons as Record<string, any>)[name];
  });

  onClick() {
    this.selectedChange.emit();
  }
}
