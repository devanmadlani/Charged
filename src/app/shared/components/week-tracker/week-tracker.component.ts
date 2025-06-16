import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { FireIcon, Tick01Icon } from '@hugeicons/core-free-icons';

export interface DayStatus {
  date: Date;
  dayName: string;
  dayShort: string;
  isDone: boolean;
  isMissed: boolean; // For past days that weren't completed
  isFuture: boolean; // For future days
  streakType: 'none' | 'start' | 'middle' | 'end' | 'single';
}

export interface WeekTrackerData {
  title: string;
  level: number;
  weeklyGoal: number;
  currentProgress: number;
  buildPhase: string;
  iconType: string;
}

@Component({
  selector: 'app-week-tracker',
  templateUrl: './week-tracker.component.html',
  styleUrls: ['./week-tracker.component.scss'],
  imports: [HugeiconsIconComponent],
  standalone: true,
})
export class WeekTrackerComponent implements OnInit {
  @Input() data: WeekTrackerData = {
    title: 'Morning walk',
    level: 5,
    weeklyGoal: 3,
    currentProgress: 2,
    buildPhase: 'Build phase 1/4',
    iconType: 'fire',
  };

  @Output() dayToggled = new EventEmitter<{
    day: DayStatus;
    allDays: DayStatus[];
  }>();

  weekDays: DayStatus[] = [];
  currentWeekStart: Date = new Date();
  FireIcon = FireIcon;
  Tick01Icon = Tick01Icon;

  constructor() {}

  ngOnInit() {
    this.initializeWeek();
  }

  /**
   * Initialize the current week starting from Monday
   */
  private initializeWeek(): void {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = currentDay === 0 ? -6 : 1 - currentDay; // Adjust to get Monday

    this.currentWeekStart = new Date(today);
    this.currentWeekStart.setDate(today.getDate() + diff);

    this.weekDays = this.generateWeekDays(this.currentWeekStart);
    this.updateStreaks();
  }

  /**
   * Generate array of days for the current week
   */
  private generateWeekDays(startDate: Date): DayStatus[] {
    const days: DayStatus[] = [];
    const dayNames = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const dayShorts = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const isPast = date < today;
      const isFuture = date > today;
      const isToday = date.toDateString() === today.toDateString();

      //Show some completed days in the past
      const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const mondayIndex = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1; // Convert to Monday-based index

      //Show last 2-3 completed days before today (if they exist and are past)
      let shouldBeCompleted = false;
      if (!isFuture && !isToday) {
        // mark some past days as completed
        shouldBeCompleted =
          i < mondayIndex && i >= Math.max(0, mondayIndex - 3);
      }

      days.push({
        date: date,
        dayName: dayNames[i],
        dayShort: dayShorts[i],
        isDone: shouldBeCompleted,
        isMissed: isPast && !isToday && !shouldBeCompleted,
        isFuture: isFuture,
        streakType: 'none',
      });
    }

    return days;
  }

  /**
   * Handle day click to toggle completion status
   */
  handleDayClick(day: DayStatus): void {
    if (day.isFuture) return; // Can't click future days

    day.isDone = !day.isDone;
    day.isMissed = !day.isDone && !day.isFuture;
    this.updateProgress();
    this.updateStreaks();
    this.dayToggled.emit({ day, allDays: this.weekDays });
  }

  /**
   * Update current progress based on completed days
   */
  private updateProgress(): void {
    this.data.currentProgress = this.weekDays.filter(
      (day) => day.isDone
    ).length;
  }

  /**
   * Update streak types for consecutive completed days
   */
  private updateStreaks(): void {
    // Reset all streak types
    this.weekDays.forEach((day) => (day.streakType = 'none'));

    // Find consecutive groups of completed days
    const consecutiveGroups = this.findConsecutiveGroups();

    consecutiveGroups.forEach((group) => {
      if (group.length === 1) {
        this.weekDays[group[0]].streakType = 'single';
      } else if (group.length === 2) {
        this.weekDays[group[0]].streakType = 'start';
        this.weekDays[group[1]].streakType = 'end';
      } else if (group.length >= 3) {
        this.weekDays[group[0]].streakType = 'start';
        this.weekDays[group[group.length - 1]].streakType = 'end';

        for (let i = 1; i < group.length - 1; i++) {
          this.weekDays[group[i]].streakType = 'middle';
        }
      }
    });
  }

  /**
   * Find consecutive groups of completed days
   */
  private findConsecutiveGroups(): number[][] {
    const groups: number[][] = [];
    let currentGroup: number[] = [];

    this.weekDays.forEach((day, index) => {
      if (day.isDone) {
        currentGroup.push(index);
      } else {
        if (currentGroup.length > 0) {
          groups.push([...currentGroup]);
          currentGroup = [];
        }
      }
    });

    // Add the last group if it exists
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  }

  /**
   * Get the CSS classes for a day based on its status and streak type
   */
  getDayClasses(day: DayStatus): string {
    const baseClasses = 'day-tile';

    if (day.isFuture) {
      return `${baseClasses} day-future`;
    }

    if (day.isMissed && !day.isDone) {
      return `${baseClasses} day-missed`;
    }

    if (day.isDone) {
      switch (day.streakType) {
        case 'single':
          return `${baseClasses} day-completed day-single`;
        case 'start':
          return `${baseClasses} day-completed day-streak-start`;
        case 'middle':
          return `${baseClasses} day-completed day-streak-middle`;
        case 'end':
          return `${baseClasses} day-completed day-streak-end`;
        default:
          return `${baseClasses} day-completed`;
      }
    }

    return `${baseClasses} day-inactive`;
  }

  /**
   * Get the current streak count for display
   */
  getCurrentStreakCount(): number {
    const groups = this.findConsecutiveGroups();
    return groups.length > 0
      ? Math.max(...groups.map((group) => group.length))
      : 0;
  }

  /**
   * Check if the spacing between two consecutive days should be styled as connected
   * This happens when both the current day and the next day are completed
   */
  isSpacingConnected(currentDayIndex: number): boolean {
    const currentDay = this.weekDays[currentDayIndex];
    const nextDay = this.weekDays[currentDayIndex + 1];

    return currentDay?.isDone && nextDay?.isDone;
  }
}
