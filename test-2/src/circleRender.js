import { ORIGIN, RADIUS } from "./contants";

export const circleRender = (
  canvas,
  context,
  numOfCircle,
  firstCirceCoor,
  circleDistance
) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let index = 0; index < numOfCircle; index++) {
    context.beginPath();
    context.arc(
      RADIUS * Math.cos((firstCirceCoor + index * circleDistance) * Math.PI) +
        ORIGIN.x,
      RADIUS * Math.sin((firstCirceCoor + index * circleDistance) * Math.PI) +
        ORIGIN.y,
      20,
      0,
      2 * Math.PI
    );
    context.fillStyle = "green";
    context.fill();
    context.stroke();
  }
};
