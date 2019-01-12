import _ from "lodash/fp";
import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds
} from "date-fns";

// Returns epoch time in seconds
export const currentTime = () => Date.now();

/**
 * Performs any number of _.set() operations in a row.
 * The base object is not mutated.
 *
 * @param {array<array<string, *>} operation - An array of string / value pairs
 *                                 [
 *                                   ['path.to.data', newValue],
 *                                   ['path.to.other.data', anotherValue]
 *                                 ]
 * @param {object} base - The base object to perform the operations on
 */
export const setMany = (operations, base) =>
  operations.reduce(
    (newBase, [path, value]) => _.set(path, value, newBase),
    base
  );

const padTimeUnit = number => number.toString().padStart(2, "0");

// Is there a better alternative?
/**
 * Takes two times and returns the difference as a time string "HH:mm:ss"
 */
export const formatTimeDifference = (start, stop) => {
  const hours = padTimeUnit(differenceInHours(stop, start));
  const minutes = padTimeUnit(differenceInMinutes(stop, start) % 60);
  const seconds = padTimeUnit(differenceInSeconds(stop, start) % 60);
  return `${hours}:${minutes}:${seconds}`;
};

export const secondsToFormattedTime = seconds => {
  const ss = seconds % 60;
  const mm = Math.floor(seconds / 60) % 60;
  const HH = Math.floor(Math.floor(seconds / 60) / 60);
  return `${padTimeUnit(HH)}:${padTimeUnit(mm)}:${padTimeUnit(ss)}`;
};
