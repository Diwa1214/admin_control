import React, { useContext ,useRef,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "../context/AuthContext";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AuthServices from "../services/AuthServices";
import { Message } from "../component/Message";
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

function Register() {
  const classes = useStyle();
  const { setUser, user, isauthenticated, setAuthenticated } = useContext(Auth);
  let timerId = useRef()
  const histroy =useNavigate()
  const [state, setState] = React.useState({
    email: "",
    password: "",
    role: "",
    toggle: false,
    messages:""
  });
  console.log(user, isauthenticated, "auth");
  const handleOpen = () => {
    setState({
      ...state,
      toggle: true,
    });
  };
  const handleClose = () => {
    setState({
      ...state,
      toggle: false,
    });
  };
  const handleChange = event => {
    setState({
      ...state,
      role: event.target.value,
      toggle:false
    });
  };
  
  const handleRegister = ()=>{
     AuthServices.register({email:state.email,password:state.password,role:state.role}).then((data)=>{
       console.log(data,'data')
       const {msgBody,ErrorMessage} = data
       if(msgBody,ErrorMessage){
         setState({
           ...state,
           messages:msgBody
         })
       }
       if(!ErrorMessage){
          timerId = setTimeout(()=>{
                histroy("/login")
          },2000)
       }
     })
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <h1>Register</h1>
        <input className={classes.input} placeholder="Enter the Email" type="email" required  onChange={(e)=>{
            e.preventDefault()
            setState({
              ...state,
              email:e.target.value
            })
          }}></input>
        <input
          type="password"
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
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">role</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={state.toggle}
            onClose={handleClose}
            onOpen={handleOpen}
            value={state.role}
            onChange={handleChange}
          >
            <MenuItem value={1}>admin</MenuItem>
            <MenuItem value={2}>manager</MenuItem>
            <MenuItem value={3}>customer</MenuItem>
          </Select>
        </FormControl>
        <button className={classes.btn} onClick={()=>{
          handleRegister()
        }}>
          Register
        </button>
        {state.message ? <Message message = {state.message}/>:null}
      </div>
    </React.Fragment>
  );
}

export default Register;
