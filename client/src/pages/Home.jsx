import React, { useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { spotifySearch } from "../services/Spotify";
import Searchbar from "../components/Searchbar/Searchbar";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { testAlbumData, testData } from "../services/Spotify";

function Home() {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (user) {
      const request = axios.post("http://localhost:3000/user", user);
      request
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const spotifyQuery = async (searchTerm) => {
    const response = await spotifySearch(searchTerm);
    console.log(response);
  };

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
