/** Clamp number between two min/max values
 *
 * @param value Number to champ
 * @param max Maximum value
 * @param min Minimum value (default 0)
 *
 * @returns Value or max/min if it goes over/under those thresholds
 */
export const clampNumber = (value: number, max: number, min = 0) =>
  Math.min(Math.max(value, min), max);
