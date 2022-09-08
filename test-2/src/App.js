import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import { ORIGIN, RADIUS } from "./contants";

function App() {
  const [numOfCircle, setNumOfCircle] = useState(3);
  const [firstCirceCoor, setfirstCirceCoor] = useState(0);
  const [circleDistance, setCircleDistance] = useState(0.1);
  const [canvasObj, setCanvasObj] = useState();
  const [circlesArr, setCirclesArr] = useState([]);

  useEffect(() => {
    const canvas = document.getElementById("myCanvas");
    setCanvasObj({
      context: canvas.getContext("2d"),
      offsetX: canvas.getBoundingClientRect().left,
      offsetY: canvas.getBoundingClientRect().top,
      width: canvas.width,
      height: canvas.height,
    });
  }, []);

  useEffect(() => {
    const circles = [];
    for (let index = 0; index < numOfCircle; index++) {
      circles.push({
        x: RADIUS * Math.cos(index * circleDistance * Math.PI) + ORIGIN.x,
        y: RADIUS * Math.sin(index * circleDistance * Math.PI) + ORIGIN.y,
        isDragging: false,
      });
    }
    setCirclesArr(circles);
  }, [numOfCircle, circleDistance]);

  useLayoutEffect(() => {
    if (circlesArr.length !== 0) {
      const newCirclesArr = circlesArr.slice();
      const movedCircles = newCirclesArr.map((circle, index) => {
        if (!circle.isDragging) {
          circle.x =
            RADIUS *
              Math.cos((firstCirceCoor + index * circleDistance) * Math.PI) +
            ORIGIN.x;
          circle.y =
            RADIUS *
              Math.sin((firstCirceCoor + index * circleDistance) * Math.PI) +
            ORIGIN.y;
        }
        return circle;
      });
      setCirclesArr(movedCircles);
    }
  }, [firstCirceCoor]);

  if (canvasObj) {
    const context = canvasObj.context;
    context.clearRect(0, 0, canvasObj.width, canvasObj.height);
    circlesArr.forEach((circle) => {
      context.beginPath();
      context.arc(circle.x, circle.y, 20, 0, 2 * Math.PI);
      context.fillStyle = "green";
      context.fill();
      context.stroke();
    });
  }

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
