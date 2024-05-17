import React from "react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, Outlet  } from 'react-router-dom';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { spotifySearch } from "../services/Spotify";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { testAlbumData, testData } from "../services/Spotify";

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
    <>
      <div className="bg-gray-500 bg-cover w-screen h-screen">
        <div className="flex justify-center">
          <Typography variant="h3" sx={{ width: "fit-content" }}>
              Welcome to TuneTalk
          </Typography>
        </div>
        <div className="flex justify-center">
            <Typography variant="h10" sx={{ width: "fit-content" }}>
              Where we talk about your favorite tunes
            </Typography>
        </div>
        <div>
            <Typography variant="h5" sx={{ width: "fit-content" }}>
              These are the tunes everyone has been talking about lately!
            </Typography>
        </div>
        <div className="Wrapper for each song">
          <div class="grid grid-cols-3 gap-4 px-4">
            <div class="bg-blue-200 p-4 ">
              <Button color="secondary">
                Song <br/>
                Picture <br/>
                Title <br/>
                Artist <br/>
                Rating <br/>
                Clicking on any part of this element and leads to the song page
              </Button>
            </div>
            <div class="bg-gray-200 p-4">
            <Button color="secondary">
                Song
                Picture
                Title
                Artist
                Rating
                Clicking on any part of this element and leads to the song page
              </Button>
            </div>
            <div class="bg-gray-200 p-4">
            <Button color="secondary">
                Song
                Picture
                Title
                Artist
                Rating
                Clicking on any part of this element and leads to the song page
              </Button>
            </div>
            <div class="bg-gray-200 p-4">
            <Button color="secondary">
                Song
                Picture
                Title
                Artist
                Rating
                Clicking on any part of this element and leads to the song page
              </Button>
            </div>
            <div class="bg-gray-200 p-4">
            <Button color="secondary">
                Song
                Picture
                Title
                Artist
                Rating
                Clicking on any part of this element and leads to the song page
              </Button>
            </div>
            <div class="bg-gray-200 p-4">
            <Button color="secondary">
                Song
                Picture
                Title
                Artist
                Rating
                Clicking on any part of this element and leads to the song page
              </Button>
            </div>
          </div>
        </div>
        <div className="Wrapper for each album">
            <Typography variant="h5" sx={{ width: "fit-content" }}>
              These are the albums everyone has been talking about lately!
            </Typography>
          </div>
          <div class="grid grid-cols-3 gap-4 px-4">
            <div class="bg-gray-200 p-4">
            <Button color="secondary">
              Album <br/>
              Picture <br/>
              Title <br/>
              Artist <br/>
              Clicking on any part of this element and leads to the album page
            </Button>
            </div>
            <div class="bg-gray-200 p-4">
            <Button color="secondary">
              Album
              Picture
              Title
              Artist
              Clicking on any part of this element and leads to the album page
            </Button>
            </div>
            <div class="bg-gray-200 p-4">
            <Button color="secondary">
              Album
              Picture
              Title
              Artist
              Clicking on any part of this element and leads to the album page
            </Button>
            </div>
            <div class="bg-gray-200 p-4">
            <Button color="secondary">
              Album
              Picture
              Title
              Artist
              Clicking on any part of this element and leads to the album page
            </Button>
            </div>
            <div class="bg-gray-200 p-4">
            <Button color="secondary">
              Album
              Picture
              Title
              Artist
              Clicking on any part of this element and leads to the album page
            </Button>
            </div>
            <div class="bg-gray-200 p-4">
            <Button color="secondary">
              Album
              Picture
              Title
              Artist
              Clicking on any part of this element and leads to the album page
            </Button>
            </div>
          </div>
      </div>
      
    </>
  );
}

export default Home;
