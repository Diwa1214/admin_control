import React from "react"
import Register from "./Registration";
import Login from"./Login/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBarComponent } from "./component/NavBar";
import Dashboard from "./Dashboard"
import Manager from "./Screen/Manager";
import Admin from "./Screen/Admin";
import  Customer from "./Screen/customer";


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBarComponent></NavBarComponent>

        <Routes>
          {/* <Route path="/login"></Route> */}
          <Route path="/register" element={<Register/>} ></Route>
          <Route path="/login" element={<Login/>} ></Route>
          <Route  path="/dashboard" element={<Dashboard exact/>}></Route>
          <Route  path="/admin" element={<Admin/>} exact></Route>
          <Route  path="/manager" element={<Manager exact/>}></Route>
          <Route  path="/customer" element={<Customer exact/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
