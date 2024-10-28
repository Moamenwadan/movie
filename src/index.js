import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App-1";
import App from "./App-2";
import StarRating from "./starRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <StarRating maxRating={5} color="#fcc419" onSetRating={setUserRating} messages={["Terrible", "Bad", "Good", "very Good", "Amazing"]} /> */}
    {/* <StarRating maxRating={5} color="#fcc419" size={32} /> */}
    <App />
  </React.StrictMode>
);
