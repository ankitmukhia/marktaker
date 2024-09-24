import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hashStringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // console.log(hash = str.charCodeAt(i))
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const color = Math.floor(Math.abs((Math.sin(hash) * 16777215) % 1) * 16777215).toString(16)
  return '#' + '0'.repeat(6 - color.length) + color;
}

export function toPascalCase(input: string) {
  return input
    .split(' ') // Split the string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter and lowercase the rest
    .join(''); // Join the words back together without spaces
}
