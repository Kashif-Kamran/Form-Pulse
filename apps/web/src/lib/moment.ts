import moment from "moment";

/**
 * Formats the difference between two dates into a human-readable string.
 * The output will be in the format of "X years, Y months, and Z days",
 * "X months and Y days", "X days", etc., depending on the difference.
 *
 * @param {string | Date} startDate - The start date (can be a string or Date object).
 * @param {string | Date} endDate - The end date (can be a string or Date object).
 * @returns {string} - A formatted string representing the difference between the two dates.
 *
 * @example
 * formatDateDifference("2023-01-01", "2023-07-16"); // "6 months and 15 days"
 * formatDateDifference("2023-01-01", "2023-01-02"); // "1 day"
 * formatDateDifference("2023-01-01", "2024-01-01"); // "1 year"
 */
export function formatDateDifference(
  startDate: string | Date,
  endDate: string | Date
): string {
  const start = moment(startDate);
  const end = moment(endDate);

  // Calculate the difference in years, months, and days
  const years = end.diff(start, "year");
  start.add(years, "years");

  const months = end.diff(start, "month");
  start.add(months, "months");

  const days = end.diff(start, "day");

  // Build the formatted string
  const resultParts: string[] = [];

  if (years > 0) {
    resultParts.push(`${years} year${years > 1 ? "s" : ""}`);
  }

  if (months > 0) {
    resultParts.push(`${months} month${months > 1 ? "s" : ""}`);
  }

  if (days > 0) {
    resultParts.push(`${days} day${days > 1 ? "s" : ""}`);
  }

  // Join the parts with "and" if there are multiple parts
  let result: string;
  if (resultParts.length > 1) {
    result = `${resultParts.slice(0, -1).join(", ")} and ${resultParts.slice(-1)[0]}`;
  } else {
    result = resultParts.join("");
  }

  return result || "0 days"; // Return "0 days" if no difference
}

export function formatDateToString(date: string | Date): string {
  return moment(date).format("DD MMM YYYY");
}
