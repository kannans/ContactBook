import React, { useEffect, useRef, useState } from 'react'
import { Fab, IconButton, styled, Modal, Tooltip, Typography, Avatar, TextField, Button, ButtonGroup, FormGroup, FormControl, Input, InputLabel, Alert } from '@mui/material'
import {Add as AddIcon, DateRange, EmojiEmotions, Image, PersonAdd, VideoCameraBack} from "@mui/icons-material"
import { Box, Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../controllers/store';
import { useNavigate, useParams } from 'react-router-dom';
import { inviteAcceptUser, resetErrorState } from './sessionSlice';

const AcceptInvite = () => {
  const [open, setOpen]=useState(false);
  let { invitation_token } = useParams();
  console.log("invitation_token", invitation_token)
  const [invitationToken, setInviteToken]=useState(invitation_token);

  const password = useRef<HTMLInputElement>();
  const passwordConfirmation = useRef<HTMLInputElement>();
  const errorMessages = useSelector((state: RootState) => state.session.errorMessages);
  const [errors, setErrors] = useState<Array<string>>([])
  const loading = false;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    password?.current?.focus();
    if (errorMessages.length > 0) {
      setErrors(errorMessages);
      dispatch(resetErrorState());
    }
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors([]);
    if (password?.current === undefined
      || password.current.value === ""
      || passwordConfirmation?.current === undefined
      || passwordConfirmation.current.value === "") {
      return setErrors(["Please fill out all fields"])
    }
    const payload = {
      password: password.current.value,
      passwordConfirmation: passwordConfirmation.current.value,
      invitationToken: invitationToken
    }
    const response = await dispatch(inviteAcceptUser(payload)) as any;

    console.log(response);
    if (errorMessages.length === 0) {
      alert("Account setup successfully done")
      navigate("/");
    } else {
      return setErrors(errorMessages);
    }
  }

  return (
    <div>

      <Box width={400} height={280} p={7}> 
        <Typography  variant="h6" color="gray" textAlign="center">
          Set Password.
        </Typography>
        {errors.length > 0 ?
          <Alert severity="error" aria-live="assertive">
            {errors.map((error, index) => {
              return <p key={`alert-${index}`}>
                {error}
              </p>
            })}
          </Alert>
        : <></>}

        <form onSubmit={handleSubmit}>
          <FormGroup row={true} id="password-group" sx={{marginTop: "1em"}}>
            <FormControl fullWidth>
              <InputLabel required htmlFor="password" id="password-label">Password</InputLabel>
              <Input id="password" type="password" inputRef={password}/>
            </FormControl>
          </FormGroup>
          <FormGroup row={true} id="password_confirmation-group" sx={{marginTop: "1em"}}>
            <FormControl fullWidth>
              <InputLabel required htmlFor="password_confirmation" id="password_confirmation-label">Password Confirmation</InputLabel>
              <Input id="password_confirmation" type="password" inputRef={passwordConfirmation}/>
            </FormControl>
          </FormGroup>
          
          <FormGroup row={true} id="submit-group" sx={{marginTop: "1em"}}>
            <FormControl fullWidth>
              <Button 
                disabled={loading} 
                variant="contained" 
                color="primary" 
                type="submit" 
                id="submit-button">Set My Password</Button>
            </FormControl>
          </FormGroup>
        </form>
      </Box>
    </div>
  )
}

export default AcceptInvite