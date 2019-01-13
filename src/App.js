import React, { Component } from "react";
import _ from "lodash/fp";

import Clocks from "./Clocks";
import Timer from "./Timer";
import EntryList from "./EntryList";
import "./App.css";

import { currentTime, setMany } from "./utils";

const activeTimerInitialState = {
  startTime: null,
  activityText: ""
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTimer: activeTimerInitialState,
      ticks: 0, // I don't like this, but I don't know how else to keep the clock up-to-date
      timeEntries: []
    };

    this.ticker = null;
  }

  startTimer = () => {
    // Start timer to update the clock every second
    this.ticker = setInterval(
      () => this.setState(_.set("ticks", this.state.ticks + 1, this.state)),
      1000
    );

    this.setState(
      setMany(
        [["activeTimer.startTime", currentTime()], ["ticks", 0]],
        this.state
      )
    );
  };

  stopTimer = () => {
    clearInterval(this.ticker);
    const newEntry = _.set("stopTime", currentTime(), this.state.activeTimer);
    const newEntryList = [...this.state.timeEntries, newEntry];
    this.setState(
      setMany(
        [
          ["activeTimer", activeTimerInitialState],
          ["timeEntries", newEntryList]
        ],
        this.state
      )
    );
  };

  render() {
    return (
      <div className="App">
        <Clocks
          startTime={this.state.activeTimer.startTime}
          ticks={this.state.ticks}
          timeEntries={this.state.timeEntries}
        />
        <Timer
          isRunning={!!this.state.activeTimer.startTime}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
        />
        <EntryList timeEntries={this.state.timeEntries} />
      </div>
    );
  }
}

export default App;
