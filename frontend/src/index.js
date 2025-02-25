import React from "react";
import { Provider } from "react-redux"; // Provider is a higher order component that provides the Redux store to any nested components.
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
