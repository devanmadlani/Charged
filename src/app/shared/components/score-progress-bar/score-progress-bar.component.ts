import { Component, computed, inject, input } from '@angular/core';
import { IonText, IonProgressBar } from '@ionic/angular/standalone';
import { ProgressColorsService } from '@app-core';

@Component({
  standalone: true,
  selector: 'app-score-progress-bar',
  templateUrl: './score-progress-bar.component.html',
  styleUrls: ['./score-progress-bar.component.scss'],
  imports: [IonProgressBar, IonText],
})
export class ScoreProgressBarComponent {
  progress = input<number>(0);
  description = input<string>('Description');
  disabled = input<boolean>(false);

  colors = computed(() =>
    this.progressColorsService.getColors(this.progress(), this.disabled())
  );

  normalizedProgress = computed(() =>
    Math.min(Math.max(this.progress() / 100, 0), 1)
  );

  displayValue = computed(() =>
    this.disabled() ? '...' : this.progress().toString()
  );

  private readonly progressColorsService = inject(ProgressColorsService);
}
