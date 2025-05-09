import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  IonText,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressRingComponent, ScoreProgressBarComponent } from '@shared';
import { addIcons } from 'ionicons';
import { person } from 'ionicons/icons';

// TODO: move to models
interface DateWithProgress {
  date: Date;
  progress: number;
  selected: WritableSignal<boolean>; // not just Signal!
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonAvatar,
    IonLabel,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    TranslateModule,
    IonButtons,
    IonButton,
    IonIcon,
    ProgressRingComponent,
    ScoreProgressBarComponent,
  ],
})
export class HomePage implements OnInit {
  dates = signal<DateWithProgress[]>([]);

  constructor() {
    addIcons({ person });
  }

  ngOnInit() {
    this.generateDates();
  }

  generateDates() {
    const today = new Date();
    const list: DateWithProgress[] = [];

    for (let i = -5; i <= 5; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      list.push({
        date: new Date(d),
        progress: Math.floor(Math.random() * 101),
        selected: signal(i === 0), // only today is selected initially
      });
    }

    this.dates.set(list);
  }

  onSelect(date: Date) {
    this.dates().forEach((item) =>
      item.selected.set(item.date.toDateString() === date.toDateString())
    );
  }
}
