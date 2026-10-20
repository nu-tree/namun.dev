import { clsx, type ClassValue } from 'clsx';
import { twMerge } from './twmerge-extension';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isServer = typeof window === 'undefined';

export function orUndefined<T>(value: T, condition: () => boolean = () => !!value) {
  return condition() ? (value as NonNullable<T>) : undefined;
}

/**
 * 딜레이 함수
 * @param ms 딜레이 시간 (밀리초)
 * @returns Promise
 */
export async function wf__delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
