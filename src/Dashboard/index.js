import React, { useContext, useEffect } from "react";
import { Auth } from "../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
const useStyle = makeStyles({
  btn: {
    width: "20%",
    height: 40,
    borderRadius: "20px",
    background: "#e51565",
    borderColor: "#e51565",
    color: "white",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  },
});
function Dashboard() {
  const classes = useStyle();
  const { user } = useContext(Auth);
  const [token,setToken] = React.useState(null)
  const[users,setuser] =React.useState({})
  useEffect(()=>{
    let token = localStorage.getItem('token')
    setToken(token)
    if(token){
      const user = jwtDecode(token)
      setuser(user)
      console.log(user)
    }
 },[token,users])
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "23px", color: "#e51565", fontWeight: "600" }}>
        Welcome YSqure Technology
      </h1>
      {token? (
        users.sub.role == "1" ? (
          <>
            <Link
              className={classes.btn}
              to="/admin "

            >
              Admin
            </Link>
            <Link className={classes.btn} to="/manager">
              manager
            </Link>

            <Link className={classes.btn} to="/customer">
              customer
            </Link>
          </>
        ) : users.sub.role == "2" ? (
          <>
            <Link className={classes.btn} to="/manager">
              Manager
            </Link>
            <Link className={classes.btn} to="/customer">
              customer
            </Link>
          </>
        ) : (
          <>
            <Link className={classes.btn} to="/customer">
              customer
            </Link>
          </>
        )
      ) : null}
    </div>
  );
}

export default Dashboard;
