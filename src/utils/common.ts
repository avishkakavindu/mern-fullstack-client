/**
 * Capitalizes the first letter of a string.
 * @param str - The input string to capitalize.
 * @returns The input string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str: string): string => {
  // Check if the input string is empty
  if (!str) {
    return '';
  }

  // Capitalize the first letter and concatenate it with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
};
