import React from "react";
import { useState, useEffect } from "react";
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

function Profile() {
  const [value, setValue] = React.useState(0);
  const [albums, setAlbums] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      const albumData = await testAlbumData();
      setAlbums(albumData);
    };
    fetchAlbums();
  }, []);

  return (
    <div>
      <body className="h-full">
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
                  alignItems: "center", // This will vertically center all items in the row
                  marginBottom: "40px",
                }}
              >
                <div className="profile-avatar" style={{ gridArea: "avatar" }}>
                  <span>
                    <Avatar sx={{ width: 100, height: 100 }} />
                  </span>
                </div>
                <div
                  className="profile-name inline-flex"
                  style={{
                    gridArea: "name",
                    justifySelf: "start", // Horizontally center the name within the grid area
                    alignSelf: "center", // Vertically center the name within the grid area
                    paddingLeft: "18%",
                  }}
                >
                  <h1 className="display-name text-[30px] font-semibold">
                    <span className="inline-flex max-w-md">vitsions</span>
                  </h1>
                </div>
                <div
                  className="profile-info self-start"
                  style={{
                    gridArea: "info",
                    display: "flex",
                    flexDirection: "column", // Stack the items vertically
                    justifyContent: "center", // Center the items horizontally within the area
                    height: "100%", // Take full height of the grid area
                  }}
                >
                  <div
                    className="profile-stats flex"
                    style={{
                      justifyContent: "center", // Horizontally center the stats within the info area
                    }}
                  >
                    <h4 className="text-center px-7 ">
                      <a href="">
                        <span>5</span>
                        <span className="definition block tracking-wider mt-3 uppercase ">
                          Info
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
            <div>
              <section
                className="recent-activity"
                style={{ marginTop: "40px" }}
              >
                <h2
                  className="section-heading"
                  style={{
                    color: "DimGray",
                    fontFamily: "Graphik-Regular-Web, sans-serif",
                    fontSize: "1rem",
                    fontWeight: "550",
                    letterSpacing: ".05em",
                    marginBottom: ".76923077rem",
                    marginTop: "0",
                    paddingBottom: "5px",
                    textTransform: "uppercase",
                  }}
                >
                  Recent Activity
                </h2>
                <ul className="flex flex-wrap justify-between">
                  {albums.map((album, index) => (
                    <Card key={index} sx={{ maxWidth: 250, marginY: 2 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={album.images[0].url}
                          alt={`Cover of the album "${album.name}"`}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {album.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {album.artistNames}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Share
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
        <footer></footer>
      </body>
    </div>
  );
}

export default Profile;
