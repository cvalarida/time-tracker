import React, { Fragment } from "react";
import { format, isThisWeek } from "date-fns";
import "./Clocks.css";

import {
  currentTime,
  formattedTimeDifference,
  formattedTimeTotal
} from "./utils";

const Clocks = props => {
  const { startTime } = props;
  let timerString = "";
  if (startTime) {
    timerString = formattedTimeDifference(startTime, currentTime());
  }

  return (
    <div className="Clocks">
      <div className="active-timer">
        {startTime ? (
          <Fragment>
            <h1>Started timer at: {format(startTime, "HH:mm:ss")}</h1>
          </Fragment>
        ) : (
          <h1>Timer not started</h1>
        )}
      </div>
      <div className="running-totals">
        <div className="current-clock">
          Current: {timerString || "00:00:00"}
        </div>
        <div className="day-clock">
          Day:{" "}
          {formattedTimeTotal(...props.timeEntries, {
            startTime,
            stopTime: currentTime()
          })}
        </div>
        <div className="week-clock">
          Week:{" "}
          {formattedTimeTotal(
            ...props.timeEntries.filter(entry => isThisWeek(entry.startTime)),
            {
              startTime,
              stopTime: currentTime()
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Clocks;
