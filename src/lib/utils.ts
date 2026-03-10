import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * STYLE MERGER (cn)
 * Utility to combine Tailwind classes cleanly.
 * Handles conditional logic (clsx) and prevents class collisions (twMerge).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}