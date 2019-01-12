import React from "react";
import "./Timer.css";

const Timer = props => {
  const startTimer = clickEvent => {
    clickEvent.preventDefault();
    props.startTimer();
  };

  const stopTimer = clickEvent => {
    clickEvent.preventDefault();
    props.stopTimer();
  };

  return (
    <div className="Timer">
      {props.isRunning ? (
        <button className="Timer-stop" onClick={stopTimer}>
          Stop timer
        </button>
      ) : (
        <button className="Timer-start" onClick={startTimer}>
          Start timer
        </button>
      )}
    </div>
  );
};

export default Timer;
