import React from "react";
import _ from "lodash/fp";
import { format } from "date-fns";
import "./EntryList.css";

import {
  formattedTimeDifference,
  secondsToFormattedTime,
  totalSecondsFromEntries
} from "./utils";

const TimeEntry = ({ entry }) => (
  <div>
    <strong>Activity:</strong> {entry.activityText} <strong>Start time:</strong>{" "}
    {format(entry.startTime, "HH:mm:ss")} <strong>End time:</strong>{" "}
    {format(entry.stopTime, "HH:mm:ss")}
    <strong>Duration:</strong>{" "}
    {formattedTimeDifference(entry.startTime, entry.stopTime)}
  </div>
);

const Day = ({ timeEntries }) => (
  <div>
    <h3>{format(timeEntries[0].startTime, "MMM DD")}</h3>
    <h4>
      Total: {secondsToFormattedTime(totalSecondsFromEntries(timeEntries))}
    </h4>
    {timeEntries.map((entry, index) => (
      <TimeEntry entry={entry} key={index} />
    ))}
  </div>
);

const EntryList = ({ timeEntries }) => {
  // Group the days together
  // {
  //   '2019-01-13': [ Entry, Entry, ...]
  // }
  const dayMap = timeEntries.reduce((runningDays, entry) => {
    const dateString = format(entry.startTime, "YYYY-MM-DD");
    const newDayList = _.concat(_.get(dateString, runningDays) || [], entry);
    return _.set(dateString, newDayList, runningDays);
  }, {});

  // Turn it into an array of arrays
  // [
  //   [ Entry, Entry ] // All the entries for a single day
  // ]
  const days = Object.keys(dayMap).map(dateString => dayMap[dateString]);

  return (
    <div className="EntryList">
      {days.map((dayEntries, index) => (
        <Day timeEntries={dayEntries} key={index} />
      ))}
    </div>
  );
};

export default EntryList;
