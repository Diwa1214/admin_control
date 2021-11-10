import React, { useContext, useEffect } from "react";
import DataServices from "../services/DataServices";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useNavigate } from "react-router-dom";
import { Auth } from "../context/AuthContext";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  btn: {
    width: "10%",
    height: 40,
    borderRadius: "20px",
    background: "#e51565",
    borderColor: "#e51565",
    color: "white",
  },
  table: {
    minWidth: 450,
  },
});
function Admin() {
  const [state, setState] = React.useState({
    admin: [],
    email:"",
    password:""
  });
  const [open, setOpen] = React.useState(false);
  const [edit,setEdit] = React.useState({})
  const classes = useStyles();
  useEffect(() => {
    DataServices.admin().then(data => {
      if (data.data) {
        setState({
          ...state,
          admin: data.data,
        });
      }
    });
  }, [state.admin]);
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  console.log(edit,"ed")
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "26px" }}
    >
      {state.admin && state.admin.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">role</TableCell>
                  <TableCell align="right">action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.admin.map(item => {
                  return (
                    <>
                      <TableRow key={item._id}>
                        <TableCell component="th" scope="row">
                          {item.email}
                        </TableCell>
                        <TableCell align="right">
                          {item.role == "2"
                            ? "manager"
                            : item.role == "1"
                            ? "admin"
                            : "customer"}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => {
                              DataServices.delete(item._id).then(res => {
                                if (res) {
                                  navigate("/admin");
                                }
                              });
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setOpen(true);
                              DataServices.details(item._id).then((res)=>{
                                 const{data} = res
                                 setEdit(data)
                              })
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <h5 style={{ textAlign: "center" }}>No Admin </h5>
      )}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            defaultValue={edit.email}
            onChange={(e)=>{
              setState({
                ...state,
                email:e.target.value
              })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="password"
            type="password"
            fullWidth
            defaultValue={edit.password}
            onChange={(e)=>{
              setState({
                ...state,
                password:e.target.value
              })
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" onClick={()=>{
            DataServices.edit(edit._id,{email:state.email,password:state.password}).then((res)=>{
               if(res){
                  setOpen(false)
               } 
            })
          }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Admin;
