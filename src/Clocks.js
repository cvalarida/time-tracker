import React, { Fragment } from "react";
import { format } from "date-fns";
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
            <span>{timerString}</span>
          </Fragment>
        ) : (
          <h1>Timer not started</h1>
        )}
      </div>
      <div className="running-totals">
        <span className="total">
          Total:{" "}
          {formattedTimeTotal(...props.timeEntries, {
            startTime,
            stopTime: currentTime()
          })}
        </span>
      </div>
    </div>
  );
};

export default Clocks;
