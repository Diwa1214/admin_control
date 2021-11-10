import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import  { AuthComponent } from "./context/AuthContext";

ReactDOM.render(
   <AuthComponent><App></App></AuthComponent>,
  document.getElementById("root")
);
