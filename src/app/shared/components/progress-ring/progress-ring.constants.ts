export const PROGRESS_RING_CONFIG = {
  RADIUS: 40,
  STROKE_WIDTH: 8,
  CENTER: 50,
  SELECTED_COLOR: '#3880ff',
  DEFAULT_LABEL_COLOR: '#000',
} as const;

export const calculateCircumference = (radius: number): number =>
  2 * Math.PI * radius;
