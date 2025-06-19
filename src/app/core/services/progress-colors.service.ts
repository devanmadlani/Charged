import { Injectable } from '@angular/core';

export interface ProgressColors {
  background: string;
  progress: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProgressColorsService {
  private readonly DISABLED_COLOR = '#e0e0e0';
  private readonly DEFAULT_BACKGROUND = '#f5f5f5'; // Generic light gray background

  private readonly COLOR_RANGES = [
    { maxValue: 39, background: '#ffebee', progress: '#d32f2f' }, // 0-39: Red
    { maxValue: 59, background: '#fff8e1', progress: '#f57c00' }, // 40-59: Orange
    { maxValue: 74, background: '#e3f2fd', progress: '#1976d2' }, // 60-74: Blue
    { maxValue: 89, background: '#e8f5e9', progress: '#689f38' }, // 75-89: Light Green
    { maxValue: 100, background: '#e8f5e9', progress: '#2e7d32' }, // 90-100: Dark Green
  ] as const;

  getColors(progress: number, disabled: boolean = false): ProgressColors {
    if (disabled) {
      return { background: this.DISABLED_COLOR, progress: this.DISABLED_COLOR };
    }

    const range =
      this.COLOR_RANGES.find((r) => progress <= r.maxValue) ??
      this.COLOR_RANGES[this.COLOR_RANGES.length - 1];

    return {
      background: range.background,
      progress: range.progress,
    };
  }

  /**
   * Get a generic background color for use in other components
   * @param lightVariant - Use a lighter shade for subtle backgrounds
   */
  getGenericBackground(lightVariant: boolean = false): string {
    return lightVariant ? '#fafafa' : this.DEFAULT_BACKGROUND;
  }

  /**
   * Get colors for a custom progress value with optional custom background
   * @param progress - Progress value (0-100)
   * @param customBackground - Optional custom background color
   * @param disabled - Whether the progress is disabled
   */
  getCustomColors(
    progress: number,
    customBackground?: string,
    disabled: boolean = false
  ): ProgressColors {
    const colors = this.getColors(progress, disabled);

    return {
      background: customBackground ?? colors.background,
      progress: colors.progress,
    };
  }
}
