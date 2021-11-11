import React, { useContext, useEffect } from "react";
import { Auth } from "../context/AuthContext";
import AuthServices from "../services/AuthServices";
import { Link,useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode'

export const NavBarComponent = () => {
  const { setUser, user, isauthenticated, setAuthenticated } = useContext(Auth);
  const [token,setToken] = React.useState(null)
  const[users,setuser] =React.useState({})
  const navigate = useNavigate()
  console.log(user, isauthenticated, "auth");
   const handleLogout = ()=>{
      //  AuthServices.logout().then((data)=>{
      //     if(data.success){
      //         setUser(data.user)
      //         setAuthenticated(false)
      //     }
      //  })
      localStorage.removeItem("token")
      navigate("/login")
   }

   useEffect(()=>{
      let token = localStorage.getItem('token')
      setToken(token)
      if(token){

        const user = jwtDecode(token)
        setuser(user)
        console.log(user)
      }
   },[token,user])

  const AuthNav = () => {
    return users ? users.sub.role == "1" ? (
        <div  style={{display:"flex",justifyContent:"flex-end",alignItems:"flex-end",margin:"12px"}}>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/admin">
              Admin
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/manager">
              manager
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/customer">
              customer
            </Link>
          </li>
          <li className="nav-item">
          <button className="nav-link" onClick={()=>{
                handleLogout()
            }}>
              logout
            </button>
          </li>
        </ul>
      </div>
    ) : users.sub.role == "2" ? (
        <div  style={{display:"flex",justifyContent:"flex-end",alignItems:"flex-end",margin:"12px"}}>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/manager">
              Manager
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/customer">
              customer
            </Link>
          </li>
          <li className="nav-item">
          <button className="nav-link" onClick={()=>{
                handleLogout()
            }}>
              logout
            </button>
          </li>
        </ul>
      </div>
    ) : (
        <div  style={{display:"flex",justifyContent:"flex-end",alignItems:"flex-end",margin:"12px"}}> 
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/customer">
              customer
            </Link>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={()=>{
                handleLogout()
            }}>
              logout
            </button>
          </li>
        </ul>
      </div>
    ):null;
  };
  const UnAuthNav = () => {
    return (
      <>
        <div style={{display:"flex",justifyContent:"flex-end",alignItems:"flex-end",margin:"12px"}}>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  };
  return (
    <React.Fragment>
      <div>{token ?   AuthNav():UnAuthNav()}</div>
    </React.Fragment>
  );
};
