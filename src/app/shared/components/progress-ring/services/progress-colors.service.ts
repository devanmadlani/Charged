import { Injectable } from '@angular/core';

export interface ProgressColors {
  baseRing: string;
  progress: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProgressColorsService {
  private readonly DISABLED_COLOR = '#e0e0e0';
  private readonly COLOR_RANGES = [
    { maxValue: 40, baseRing: '#fdecea', progress: '#f44336' },
    { maxValue: 70, baseRing: '#fff3e0', progress: '#ff9800' },
    { maxValue: 100, baseRing: '#e8f5e9', progress: '#4caf50' },
  ] as const;

  getColors(progress: number, disabled: boolean): ProgressColors {
    if (disabled) {
      return { baseRing: this.DISABLED_COLOR, progress: this.DISABLED_COLOR };
    }

    const range =
      this.COLOR_RANGES.find((r) => progress <= r.maxValue) ??
      this.COLOR_RANGES[this.COLOR_RANGES.length - 1];

    return {
      baseRing: range.baseRing,
      progress: range.progress,
    };
  }
}
