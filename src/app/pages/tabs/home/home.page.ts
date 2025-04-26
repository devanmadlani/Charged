import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TYPEFORM_FORMS } from '@app-core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { SurveyComponent } from 'app/shared/components/survey/survey.component';
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
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    TranslateModule,
    SurveyComponent,
    IonButtons,
    IonButton,
    IonIcon,
  ],
})
export class HomePage implements OnInit {
  dates = signal<DateWithProgress[]>([]);
  TYPEFORM_FORMS = TYPEFORM_FORMS;

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
