import React, { useEffect } from 'react'
import { Box, Switch } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AccountBox, DarkMode, Group, Home, MenuBook, ModeNight, Pages, Person2, Settings, Storefront } from '@mui/icons-material';

const Sidebar = () => {
  return (
    <Box flex={1} p={2} sx={{display: {xs: "none", sm: "block"}}}>
       <Box position="fixed">
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#home">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>


        <ListItem disablePadding>
          <ListItemButton component="a" href="#home">
            <ListItemIcon>
              <Person2 />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
      
      </List>
      </Box>
    </Box>
  )
}

export default Sidebar