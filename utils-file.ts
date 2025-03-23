import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to combine classnames with Tailwind CSS
 * Also merges conflicting tailwind classes properly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Calculate the reading time for text content
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Format a number to a percentage with specified decimal places
 */
export function formatPercentage(value: number, decimalPlaces = 1): string {
  return `${value.toFixed(decimalPlaces)}%`;
}

/**
 * Create a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

/**
 * Extract initials from a name for avatar placeholders
 */
export function getInitials(name: string): string {
  const names = name.split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}

/**
 * Add an aurora glow effect for hover animations
 * Applies a gradient shadow based on specified intensity
 */
export function createAuroraGlow(
  element: HTMLElement,
  color: "green" | "blue" | "purple" = "green",
  intensity = 0.5
): void {
  const colors = {
    green: "rgba(20, 232, 30, " + intensity + ")",
    blue: "rgba(0, 234, 141, " + intensity + ")",
    purple: "rgba(141, 0, 196, " + intensity + ")",
  };
  
  element.style.boxShadow = `0 0 15px ${colors[color]}`;
  
  // Remove effect after animation completes
  setTimeout(() => {
    element.style.boxShadow = "";
  }, 1000);
}
