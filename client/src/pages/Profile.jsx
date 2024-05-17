import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { testAlbumData } from "../services/Spotify";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { user } = useAuth0();
  const { name, picture } = user;
  const [value, setValue] = useState(0);
  const [albums, setAlbums] = useState([]);
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      const albumData = await testAlbumData();
      setAlbums(albumData.slice(0, 15));
      setFavoriteTracks(albumData.slice(0, 4));
      setRecentActivity(albumData.slice(5, 10));
    };
    fetchAlbums();
  }, []);

  const sectionHeadingStyle = {
    color: "DimGray",
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
    fontSize: "1rem",
    fontWeight: "550",
    letterSpacing: ".05em",
    marginBottom: ".76923077rem",
    marginTop: "0",
    paddingBottom: "5px",
    textTransform: "uppercase",
  };

  const displayTracks = (tracks) => (
    <Box display="flex" justifyContent="space-between" flexWrap="wrap">
      {tracks.map((track, index) => (
        <Card key={index} sx={{ maxWidth: 200, marginY: 2 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={track.images[0].url}
              alt={`Cover of the track "${track.name}"`}
            />
            <CardContent sx={{ padding: 2 }}>
              <Typography gutterBottom variant="h6" component="div">
                {track.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {track.artistNames}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );

  return (
    <div style={{ fontFamily: "Roboto,Helvetica,Arial,sans-serif" }}>
      <header></header>
      <div className="content py-10 px-0">
        <div
          className="content-wrap mt-0 mb-auto"
          style={{ width: "950px", margin: "0 auto" }}
        >
          <section className="profile-header block ml-0 mr-0">
            <div
              className="profile-summary grid"
              style={{
                gridTemplateAreas: `'avatar name info'`,
                gridTemplateColumns: "100px 1fr 1fr",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              <div className="profile-avatar" style={{ gridArea: "avatar" }}>
                <span>
                  <Avatar sx={{ width: 100, height: 100 }} src={picture} />
                </span>
              </div>
              <div
                className="profile-name inline-flex"
                style={{
                  gridArea: "name",
                  justifySelf: "start",
                  alignSelf: "center",
                  paddingLeft: "18%",
                }}
              >
                <h1 className="display-name text-[30px] font-semibold">
                  <span className="inline-flex max-w-md">{name}</span>
                </h1>
              </div>
              <div
                className="profile-info self-start"
                style={{
                  gridArea: "info",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <div
                  className="profile-stats flex"
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <h4 className="text-center px-7 ">
                    <a href="">
                      <span>5</span>
                      <span className="definition block tracking-wider mt-3 uppercase ">
                        Reviews
                      </span>
                    </a>
                  </h4>
                  <h4 className="text-center px-7">
                    <a href="">
                      <span>0</span>
                      <span className="definition block tracking-wider mt-3 uppercase">
                        Followers
                      </span>
                    </a>
                  </h4>
                  <h4 className="text-center px-7">
                    <a href="">
                      <span>0</span>
                      <span className="definition block tracking-wider mt-3 uppercase">
                        Following
                      </span>
                    </a>
                  </h4>
                </div>
              </div>
            </div>
            <nav className="profile-navigation">
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  fontFamily: "",
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <Tabs value={value} onChange={handleChange} centered>
                  <Tab label="Profile" />
                  <Tab label="Activity" />
                  <Tab label="Tracks" />
                </Tabs>
              </Box>
            </nav>
          </section>
          {value === 0 && (
            <>
              <section
                className="favorite-tracks"
                style={{ marginTop: "40px" }}
              >
                <h2 style={sectionHeadingStyle}>Favorite Tracks</h2>
                {displayTracks(favoriteTracks)}
              </section>
              <section
                className="recent-activity"
                style={{ marginTop: "40px" }}
              >
                <h2 style={sectionHeadingStyle}>Recent Activity</h2>
                {displayTracks(recentActivity)}
              </section>
            </>
          )}
          {value === 2 && (
            <section className="all-tracks" style={{ marginTop: "40px" }}>
              <h2 style={sectionHeadingStyle}>All Tracks</h2>
              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                {albums.map((album, index) => (
                  <Card key={index} sx={{ maxWidth: 200, marginY: 2 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={album.images[0].url}
                        alt={`Cover of the track "${album.name}"`}
                      />
                      <CardContent sx={{ padding: 2 }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {album.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {album.artistNames}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
            </section>
          )}
        </div>
      </div>
      <footer></footer>
    </div>
  );
}

export default Profile;
