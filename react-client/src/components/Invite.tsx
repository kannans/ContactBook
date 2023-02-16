import React, { useEffect, useRef, useState } from 'react'
import { Fab,  Modal, Tooltip, Typography, Button, FormGroup, FormControl, Input, InputLabel, styled } from '@mui/material'
import {Add as AddIcon} from "@mui/icons-material"
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../store";
import { useNavigate } from 'react-router-dom';
import { getUsers, inviteUser, resetErrorState } from './sessions/sessionSlice';

const Invite = () => {
  const [open, setOpen]=useState(false);

  const StyleModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  })
  const emailRef = useRef<HTMLInputElement>();
  const errorMessages = useSelector((state: RootState) => state.session.errorMessages);
  const [errors, setErrors] = useState<Array<string>>([])
  const loading = false;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    emailRef?.current?.focus();
    if (errorMessages.length > 0) {
      setErrors(errorMessages);
      dispatch(resetErrorState());
    }
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors([]);
    if (emailRef?.current === undefined
      || emailRef.current.value === "") {
      return setErrors(["Please fill out all fields"])
    }
    const payload = {
      email: emailRef.current.value,
    }
    const response = dispatch(inviteUser(payload)) as any;
    console.log(response);
    setOpen(false)
    if (errorMessages.length === 0) {
      alert("Invited successfully")
      dispatch(getUsers("_key")) as any;
    } else {
      return setErrors(errorMessages);
    }
  }

  return (
    <>
    <Tooltip onClick={(i)=> setOpen(true)} title="Add" sx={{position: "fixed", bottom: 20, left: {xs: "calc(50% - 25px)", md: 30}}}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Tooltip>
    <StyleModal
      open={open}
      onClose={()=> setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box width={400} height={280} bgcolor={"background.default"} color={"text.primary"} p={3} borderRadius={3}> 
        <Typography  variant="h6" color="gray" textAlign="center">
          Invite Users
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormGroup row={true} id="email-group" sx={{marginTop: "1em"}}>
            <FormControl fullWidth>
              <InputLabel required htmlFor="email" id="email-label">Email Address</InputLabel>
              <Input id="email" type="email" inputRef={emailRef}/>
            </FormControl>
          </FormGroup>
          
          <FormGroup row={true} id="submit-group" sx={{marginTop: "1em"}}>
            <FormControl fullWidth>
              <Button 
                disabled={loading} 
                variant="contained" 
                color="primary" 
                type="submit" 
                id="submit-button">Send Invite</Button>
            </FormControl>
          </FormGroup>
        </form>
      </Box>
    </StyleModal>
    </>
  )
}

export default Invite
