import { Component, effect, input, OnInit, signal } from '@angular/core';
import { IonText, IonProgressBar } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-score-progress-bar',
  templateUrl: './score-progress-bar.component.html',
  styleUrls: ['./score-progress-bar.component.scss'],
  imports: [IonProgressBar, IonText],
})
export class ScoreProgressBarComponent {
  score = input<number>();
  progress = signal(0);

  constructor() {
    effect(() => {
      const scoreValue = this.score() ?? 0;
      const normalizedProgress = Math.min(Math.max(scoreValue / 100, 0), 1);
      this.progress.set(normalizedProgress);
    });
  }
}
