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
    { maxValue: 39, baseRing: '#ffebee', progress: '#d32f2f' }, // 0-39: Red
    { maxValue: 59, baseRing: '#fff8e1', progress: '#f57c00' }, // 40-59: Orange
    { maxValue: 74, baseRing: '#e3f2fd', progress: '#1976d2' }, // 60-74: Blue
    { maxValue: 89, baseRing: '#e8f5e9', progress: '#689f38' }, // 75-89: Light Green
    { maxValue: 100, baseRing: '#e8f5e9', progress: '#2e7d32' }, // 90-100: Dark Green
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
