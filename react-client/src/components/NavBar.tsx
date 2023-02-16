import React from 'react'
import { AppBar, Avatar, styled, Toolbar, Typography} from '@mui/material'
import {ContactMail } from '@mui/icons-material'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from "../store";
import { logoutUser } from './sessions/sessionSlice';

const StyledToolbar = styled(Toolbar)({
  justifyContent: "space-between"
})

const Icons = styled("div")(({theme})=>({
  display: "none", 
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]:{
    display: "flex"
  }
}))

const UserBox = styled("div")(({theme})=>({
  display: "flex", 
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]:{
    display: "none"
  }
}))

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const refreshToken = useSelector((state : RootState) => state.session.accessToken);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [open, setOpen] = React.useState(false);
  
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    if(refreshToken)
      dispatch(logoutUser(refreshToken));
      navigate('/login');
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant='h6' sx={{display: {xs: "none", sm: "block"}}}>Contacts</Typography>
        <ContactMail sx={{display: {xs: "block", sm: "none"}}} />
       
        <Icons>
          <Avatar 
          src="https://media.licdn.com/dms/image/C4D03AQEn8e4NRu9j7A/profile-displayphoto-shrink_800_800/0/1599814737836?e=1680739200&v=beta&t=-_BNpNEe7mU4VA43Pu8AK7-tE92KRYegICEumT48wBo"
          onClick={handleClick}></Avatar>
        </Icons>
        <UserBox onClick={handleClick}>
          <Avatar src="https://media.licdn.com/dms/image/C4D03AQEn8e4NRu9j7A/profile-displayphoto-shrink_800_800/0/1599814737836?e=1680739200&v=beta&t=-_BNpNEe7mU4VA43Pu8AK7-tE92KRYegICEumT48wBo"></Avatar>
        </UserBox>
      </StyledToolbar>
     
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar