import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component, ClassAttributes } from "react";

import formattedSeconds from "./helpers/formattedSeconds";

const Lap = (props: { index: number; lap: number; onDelete: () => {} }) => (
  <div key={props.index} className="stopwatch-lap">
    <strong>{props.index}</strong>/ {formattedSeconds(props.lap)}{" "}
    <button onClick={props.onDelete}> X </button>
  </div>
);

export default Lap;
