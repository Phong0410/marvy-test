import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [n, setN] = useState(9);

  const arr = [];

  for (let index = 0; index < n; index++) {
    const square = (
      <div
        key={index}
        className="w-40 h-40 m-10 bg-white border-2 boder-black"
      ></div>
    );
    arr.push(square);
  }

  return (
    <div className="App">
      <input
        type="text"
        value={n}
        className="border-2 text-3xl"
        onChange={(e) => setN(e.target.value)}
      />
      <div className="flex flex-wrap bg-blue-500 p-10 justify-center">
        {arr}
      </div>
    </div>
  );
}

export default App;
