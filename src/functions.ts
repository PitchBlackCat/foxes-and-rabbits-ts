/**
 * Returns a random integer from min to max, including both min and max
 * @param min
 * @param max
 */
export function randomRange(min: number, max: number): number {
  return Math.floor(Math.random() * ((max - min + 1)) + min);
}

/**
 * Returns a random integer from 0 to max, including both 0 and max.
 * @param max
 */
export function randomInt(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}

/**
 * Returns a random item from an array.
 * @param arr
 */
export function randomItem<T>(arr: T[]): T {
  return arr[randomInt(arr.length - 1)];
}
