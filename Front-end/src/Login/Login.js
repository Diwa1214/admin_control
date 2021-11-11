import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "../context/AuthContext";
import AuthServices from "../services/AuthServices";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles({
  container: {
    display: "flex",
    width: "60%",
    height: 400,
    background: "#f5f5f5",
    borderColor: "red",
    flexDirection: "column",
    borderWidth: 13,
    borderRadius: "12px",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "20%",
    marginTop:"50px"
  },
  input: {
    width: "40%",
    height: 40,
    borderWidth: 0,
    borderRadius: "20px",
    marginBottom: "12px",
  },
  button: {
    display: "block",
    marginTop: "12px",
  },
  formControl: {
    margin: "10px",
    minWidth: 320,
  },
  btn: {
    width: "30%",
    height: 40,
    borderRadius: "20px",
    background: "#e51565",
    borderColor: "#e51565",
    color: "white",
  },
});

function Login() {
  const classes = useStyle();
  const { setUser, user, isauthenticated, setAuthenticated } = useContext(Auth);
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const navigation = useNavigate()
  
  const handleLogin = ()=>{
     AuthServices.login({email:state.email,password:state.password}).then((data)=>{
        const {isAuthenticated,user,token} = data
        if(isAuthenticated){
           setUser(user)
           localStorage.setItem("token",user.token)
           localStorage.setItem("user",JSON.stringify(user))
           setAuthenticated(true)
           navigation("/dashboard")
        }
      })
  }
  
  return (
    <React.Fragment>
      <div className={classes.container}>
        <h1>Login</h1>
        <input className={classes.input} placeholder="Enter the Email" onChange={(e)=>{
            e.preventDefault()
            setState({
                ...state,
                email:e.target.value
            })
        }}></input>
        <input
          className={classes.input}
          placeholder="Enter the Password"
          onChange={(e)=>{
              e.preventDefault()
              setState({
                  ...state,
                  password:e.target.value
              })
          }}
        ></input>
        
        <button className={classes.btn} onClick={()=>{
            handleLogin()
        }}>
            Login
        </button>
      </div>
    </React.Fragment>
  );
}

export default Login;
