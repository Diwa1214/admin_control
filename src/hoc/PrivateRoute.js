import React,{useContext} from 'react'
import { Route } from 'react-router';
import {Navigate} from "react-router-dom"
import { Auth } from '../context/AuthContext';
import { Routes } from "react-router-dom";


export function PrivateRoute({component:Component,...rest}) {
    const { setUser, user, isauthenticated, setAuthenticated } = useContext(Auth);
    return (
        <Routes>
            <Route
              {...rest} render={props =>{
                  if(!isauthenticated){
                      <Navigate to="/login"></Navigate>
                  }
              }}
             ></Route>
        </Routes>
    )
}

export default PrivateRoute
