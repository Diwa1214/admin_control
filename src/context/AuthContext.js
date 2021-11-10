import React, { createContext, useEffect } from "react";
import AuthServices from "../services/AuthServices";

export const Auth = createContext();

export const AuthComponent =   ({children}) => {
  const [user, setUser] = React.useState(null);
  const [isauthenticated, setAuthenticated] = React.useState(false);
  const [isLoaded, setLoaded] = React.useState(true);
   console.log('authload',isauthenticated)
  useEffect(() => {
    AuthServices.isAuthenticated().then(data => {
      if( data.user.email !=="" && data.user.role !==""){
        setUser(data.user);
        setAuthenticated(true);
        setLoaded(false);
      }
    });
  }, []);

  return (
    <React.Fragment>
      { <Auth.Provider value={{setUser,user,isauthenticated,setAuthenticated}}>
            {children}
          </Auth.Provider>}
    </React.Fragment>
  );
};
