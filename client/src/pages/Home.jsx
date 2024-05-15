import React from "react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, Outlet  } from 'react-router-dom';
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

function Home() {
  const location = useLocation();
  const path = location.pathname;

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

const menu1 = [
  {title: 'Home', path: '/'},
  {title: 'Album', path: '/album'},
  {title: 'SavedAlbum', path: '/savedalbum'},
  {title: 'SavedSongs', path: '/savedsongs'},
  {title: 'Song', path: '/song'},
  {title: 'Test', path: '/test'},
  {title: 'Profile', path: '/profile'}
]

const DrawerList = (
  <div>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {menu1.map((item, index) => (
            <ListItem key={item.title}  disablePadding
            component = {Link}
            to = { item.path }
            button
            selected = { item.path === path }
            >
              <ListItemButton>
                <ListItemText primary={item.title}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
);

  return (
    <div>
          <body className="bg-stone-800">
            <p className="float-right text-top p-4 text-stone-400">
              SignInButton <Avatar>Me</Avatar>
            </p>
            <p className="text-center text-indigo-500 font-bold text-3xl p-4">
              Welcome to BeatRater
              <div className="text-center text-stone-400 text-xl">
                your totally not vr interactive music rating and listening companion
              </div>
            </p>
            <Button onClick={toggleDrawer(true)}>
              <ListItemIcon>
                <div className="text-stone-400">
                  Menu
                </div>
              </ListItemIcon>
            </Button>
                <Drawer PaperProps={{
                  sx: {
                    backgroundColor: "#292524",
                    color: "#6366f1",
                  }
                }}
                    open={open} onClose={toggleDrawer(false)}>
                  {DrawerList}
                </Drawer>
          </body>
          <div className="bg-stone-700 text-center text-stone-300 text-xl h-screen p-4">
            This is just filler text look at me I am a home screen... What is my purpose? What is your purpose? Why am I here?
            <br/>
            <br/>
            <p>
              This is under construction while we determine what exactly we wish to put in here
            </p>
            <br/>
            <p>
              more filler text
            </p>
          </div>
            <div>
              <Box
                display="flex"
                alignItems="center"
                sx={{ border: '2px solid grey' }}
              >
                Hello I am a box
              </Box>
            </div>
    </div>
    );
}

export default Home;
