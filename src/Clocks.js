import React, { Fragment } from "react";
import { format } from "date-fns";
import "./Clocks.css";

import { currentTime, formatTimeDifference } from "./utils";

const Clocks = props => {
  const { startTime } = props;
  let timerString = "";
  if (startTime) {
    timerString = formatTimeDifference(startTime, currentTime());
  }

  return (
    <div className="Clocks">
      {startTime ? (
        <Fragment>
          <h1>Started timer at: {format(startTime, "HH:mm:ss")}</h1>
          <span>Timer has been running for {timerString}</span>
        </Fragment>
      ) : (
        <h1>Timer not started</h1>
      )}
    </div>
  );
};

export default Clocks;
