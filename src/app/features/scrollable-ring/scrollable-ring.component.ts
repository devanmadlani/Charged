import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ProgressRingComponent } from '@shared';

// TODO: move to models
interface DateWithProgress {
  date: Date;
  progress: number;
  selected: WritableSignal<boolean>;
}
@Component({
  selector: 'app-scrollable-ring',
  standalone: true,
  templateUrl: './scrollable-ring.component.html',
  styleUrls: ['./scrollable-ring.component.scss'],
  imports: [CommonModule, ProgressRingComponent],
})
export class ScrollableRingComponent implements OnInit {
  dates = signal<DateWithProgress[]>([]);

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
