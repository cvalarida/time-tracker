import React from "react";
import { format, differenceInSeconds } from "date-fns";
import "./EntryList.css";

import { formatTimeDifference, secondsToFormattedTime } from "./utils";

const TimeEntry = ({ entry }) => (
  <div>
    <strong>Activity:</strong> {entry.activityText} <strong>Start time:</strong>{" "}
    {format(entry.startTime, "HH:mm:ss")} <strong>End time:</strong>{" "}
    {format(entry.stopTime, "HH:mm:ss")}
    <strong>Duration:</strong>{" "}
    {formatTimeDifference(entry.startTime, entry.stopTime)}
  </div>
);

const EntryList = ({ timeEntries }) => {
  return (
    <div className="EntryList">
      {timeEntries.map(entry => (
        <TimeEntry entry={entry} />
      ))}
      <h4>
        Total:{" "}
        {secondsToFormattedTime(
          timeEntries.reduce(
            (total, entry) =>
              total + differenceInSeconds(entry.stopTime, entry.startTime),
            0
          )
        )}
      </h4>
    </div>
  );
};

export default EntryList;