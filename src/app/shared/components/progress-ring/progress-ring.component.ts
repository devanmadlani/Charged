import {
  Component,
  computed,
  input,
  output,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-progress-ring',
  standalone: true,
  templateUrl: './progress-ring.component.html',
  styleUrls: ['./progress-ring.component.scss'],
})
export class ProgressRingComponent {
  progress = input<number>(0);
  label = input<string>(''); // Day number
  month = input<string>(''); // Month text (e.g. Jan)
  selected = input<boolean>(false);
  size = input<number>(60); // Diameter in px

  @Output() selectedChange = new EventEmitter<void>();

  readonly radius = 25;
  readonly strokeWidth = 5;
  readonly center = computed(() => this.size() / 2);
  readonly circumference = computed(() => 2 * Math.PI * this.radius);

  readonly dashArray = computed(() => {
    const value = Math.min(100, Math.max(0, this.progress()));
    const dash = (value / 100) * this.circumference();
    return `${dash} ${this.circumference()}`;
  });

  readonly baseRingColor = computed(() => {
    const val = this.progress();
    if (val <= 40) return '#fdecea'; // light red
    if (val <= 70) return '#fff3e0'; // light orange
    return '#e8f5e9'; // light green
  });

  readonly progressColor = computed(() => {
    const val = this.progress();
    if (val <= 40) return '#f44336'; // bold red
    if (val <= 70) return '#ff9800'; // bold orange
    return '#4caf50'; // bold green
  });

  readonly labelColor = computed(() => (this.selected() ? '#3880ff' : '#000'));

  onClick() {
    this.selectedChange.emit();
  }
}
