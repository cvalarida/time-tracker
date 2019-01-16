import _ from "lodash/fp";
import { differenceInSeconds } from "date-fns";

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

/**
 * Takes two times and returns the difference as a time string "HH:mm:ss"
 */
export const formattedTimeDifference = (from, to) =>
  secondsToFormattedTime(differenceInSeconds(to, from));

export const secondsToFormattedTime = seconds => {
  if (!seconds) {
    return "00:00:00";
  }
  const ss = seconds % 60;
  const mm = Math.floor(seconds / 60) % 60;
  const HH = Math.floor(Math.floor(seconds / 60) / 60);
  return `${padTimeUnit(HH)}:${padTimeUnit(mm)}:${padTimeUnit(ss)}`;
};

export const formattedTimeTotal = (...timeEntries) => {
  const totalSeconds = timeEntries.reduce(
    (total, entry) =>
      total +
      (entry.startTime
        ? differenceInSeconds(entry.stopTime, entry.startTime)
        : 0),
    0
  );
  return secondsToFormattedTime(totalSeconds);
};

export const totalSecondsFromEntries = timeEntries =>
  timeEntries.reduce(
    (total, entry) =>
      total + differenceInSeconds(entry.stopTime, entry.startTime),
    0
  );
