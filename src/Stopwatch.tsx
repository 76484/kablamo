import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component, ClassAttributes } from "react";

import Lap from "./Lap";
import formattedSeconds from "./helpers/formattedSeconds";

interface StopwatchProps extends ClassAttributes<Stopwatch> {
  initialSeconds: number;
}

class Stopwatch extends Component<StopwatchProps, any> {
  incrementer: any;

  constructor(props: StopwatchProps) {
    super(props);

    this.state = {
      laps: [],
      secondsElapsed: props.initialSeconds,
      lastClearedIncrementer: null,
    };
    this.incrementer = 0;

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleLapClick = this.handleLapClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  handleStartClick() {
    this.incrementer = setInterval(
      () =>
        this.setState({
          secondsElapsed: this.state.secondsElapsed + 1,
        }),
      1000
    );
  }

  handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer,
    });
  }

  handleResetClick() {
    clearInterval(this.incrementer);

    this.setState({
      laps: [],
      secondsElapsed: 0,
    });
  }

  handleLapClick() {
    this.setState({
      laps: this.state.laps.concat([this.state.secondsElapsed]),
    });
  }

  handleDeleteClick(index: number) {
    return () => {
      const { laps } = this.state;

      this.setState({
        laps: laps.slice(0, index).concat(laps.slice(index + 1)),
      });
    };
  }

  render() {
    const { laps, secondsElapsed, lastClearedIncrementer } = this.state;

    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>
        {secondsElapsed === 0 || this.incrementer === lastClearedIncrementer ? (
          <button
            type="button"
            className="start-btn"
            onClick={this.handleStartClick}
          >
            start
          </button>
        ) : (
          <button
            type="button"
            className="stop-btn"
            onClick={this.handleStopClick}
          >
            stop
          </button>
        )}
        {secondsElapsed !== 0 && this.incrementer !== lastClearedIncrementer ? (
          <button type="button" onClick={this.handleLapClick}>
            lap
          </button>
        ) : null}
        {secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer ? (
          <button type="button" onClick={this.handleResetClick}>
            reset
          </button>
        ) : null}
        <div className="stopwatch-laps">
          {laps.map((lap: number, i: number) => (
            <Lap
              index={i + 1}
              key={lap}
              lap={lap}
              onDelete={this.handleDeleteClick(i)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Stopwatch;
