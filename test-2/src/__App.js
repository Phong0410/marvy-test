import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";

import { circleRender } from "./circleRender";
import { ORIGIN } from "./contants";

function App() {
  const [numOfCircle, setNumOfCircle] = useState(3);
  const [firstCirceCoor, setfirstCirceCoor] = useState(0);
  const [circleDistance, setCircleDistance] = useState(0.1);
  const [canvas, setCanvas] = useState();
  const [context, setContext] = useState();

  useEffect(() => {
    const newCanvas = document.getElementById("myCanvas");
    const newContext = newCanvas.getContext("2d");
    setCanvas(newCanvas);
    setContext(newContext);
  }, []);

  useLayoutEffect(() => {
    if (canvas && context)
      circleRender(
        canvas,
        context,
        numOfCircle,
        firstCirceCoor,
        circleDistance
      );
  }, [firstCirceCoor]);

  setTimeout(() => {
    setfirstCirceCoor(firstCirceCoor + 0.001);
  }, 10);

  return (
    <div className="App">
      <canvas id="myCanvas" width={ORIGIN.x * 2} height={ORIGIN.y * 2}></canvas>
      <div>
        {"number of circle : "}
        <input
          type="text"
          value={numOfCircle}
          onChange={(e) => {
            setNumOfCircle(e.target.value);
          }}
        />
        {(isNaN(numOfCircle) || numOfCircle < 0) && "invalid value!"}
      </div>
      <div>
        {"distance (𝜋): "}
        <input
          type="text"
          value={circleDistance}
          onChange={(e) => {
            setCircleDistance(e.target.value);
          }}
        />
        {isNaN(circleDistance) && "invalid value!"}
      </div>
    </div>
  );
}

export default App;
