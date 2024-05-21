import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Fade } from "@mui/material";
import { testAlbumData } from "../services/Spotify";
import { useAuth0 } from "@auth0/auth0-react";
import ActivityCard from "../components/ActivityCard/ActivityCard";
import axios from "axios";
import {
  getAlbumDataFromDB,
  getTrackDataFromDB,
  getOneAlbumId,
  getOneTrackId,
} from "../services/Spotify";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useAuth0();
  const { name, picture } = user;
  const [value, setValue] = useState(0);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await axios.get(
        `http://localhost:3000/album/${user.sub}`
      );
      const [listenedAlbumsData, currentlyAlbumsData, plannedAlbumsData] =
        await Promise.all([
          getAlbumDataFromDB(response.data.listened_albums),
          getAlbumDataFromDB(response.data.currently_albums),
          getAlbumDataFromDB(response.data.planned_albums),
        ]);
      setAlbums([
        ...listenedAlbumsData,
        ...currentlyAlbumsData,
        ...plannedAlbumsData,
      ]);
    };

    const fetchTracks = async () => {
      const response = await axios.get(
        `http://localhost:3000/song/${user.sub}`
      );
      const [listenedSongsData, plannedSongsData] = await Promise.all([
        getTrackDataFromDB(response.data.listened_songs),
        getTrackDataFromDB(response.data.planned_songs),
      ]);
      setFavoriteTracks([...listenedSongsData, ...plannedSongsData]);
      setRecentActivity([...listenedSongsData, ...plannedSongsData]);
      setTracks([...listenedSongsData, ...plannedSongsData]);
    };

    const fetchAlbumReviews = async () => {
      const response = await axios.get(
        `http://localhost:3000/albumReview/profile/${user.sub}`
      );

      const reviewsData = await Promise.all(
        response.data.map(async (review, index) => {
          const albumData = await getOneAlbumId(review.spotify_id);
          return {
            id: review.review_id,
            image: albumData.images[0].url,
            title: albumData.name,
            rating: review.rating,
            review: review.review,
            username: user.name,
            userAvatar: user.picture,
            year: new Date(review.createdAt).toLocaleDateString(),
            spotifyId: review.spotify_id,
            album: true,
          };
        })
      );
      setActivities(reviewsData);
    };

    const fetchSongReviews = async () => {
      const response = await axios.get(
        `http://localhost:3000/songReview/profile/${user.sub}`
      );

      const reviewsData = await Promise.all(
        response.data.map(async (review, index) => {
          const songData = await getOneTrackId(review.spotify_id);
          return {
            id: review.review_id,
            image: songData.album.images[0].url,
            title: songData.name,
            rating: review.rating,
            review: review.review,
            username: user.name,
            userAvatar: user.picture,
            year: new Date(review.createdAt).toLocaleDateString(),
            spotifyId: review.spotify_id,
            album: false,
          };
        })
      );
      setActivities((prev) => [...prev, ...reviewsData]);
    };

    fetchAlbums();
    fetchTracks();
    fetchAlbumReviews();
    fetchSongReviews();
  }, []);

  const getAllArtists = (artists) => {
    let allArtists = "";
    artists.map((artist) => {
      allArtists += artist.name + ", ";
    });
    return allArtists.slice(0, -2);
  };

  const sectionHeadingStyle = {
    color: "DimGray",
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
    fontSize: "16px",
    fontWeight: "550",
    letterSpacing: "1px",
    marginBottom: "3px",
    marginTop: "0",
    paddingBottom: "5px",
    textTransform: "uppercase",
  };

  const displayTracks = (tracks) => (
    <Box display="flex" justifyContent="justify-start" flexWrap="wrap">
      {tracks.map((track, index) => (
        <Card
          key={index}
          sx={{ maxWidth: 200, maxHeight: 400, marginY: 2, marginX: 2 }}
        >
          <Link to={`/song/${track.trackResponse.id}`}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={track.trackResponse.album.images[0].url}
                alt={`Cover of the track "${track.name}"`}
              />
              <CardContent sx={{ padding: 2 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {track.trackResponse.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {track.trackResponse.artists[0].name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      ))}
    </Box>
  );

  if (albums.length === 0 || tracks.length === 0) {
    return <Loading />;
  }

  return (
    <Fade in={true} timeout={1000}>
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
                      <button onClick={() => setValue(1)}>
                        <span>{activities.length}</span>
                        <span className="definition block tracking-wider mt-3 uppercase ">
                          Reviews
                        </span>
                      </button>
                    </h4>
                    <h4 className="text-center px-7">
                      <span>0</span>
                      <span className="definition block tracking-wider mt-3 uppercase">
                        Followers
                      </span>
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
            {value === 1 && (
              <section className="activity" style={{ marginTop: "40px" }}>
                <h2 style={sectionHeadingStyle}>User Activity</h2>
                {activities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </section>
            )}
            {value === 2 && (
              <section className="all-tracks" style={{ marginTop: "40px" }}>
                <h2 style={sectionHeadingStyle}>All Albums</h2>
                <Box
                  display="flex"
                  justifyContent="justify-start"
                  flexWrap="wrap"
                >
                  {albums.map((album, index) => (
                    <Card
                      key={index}
                      sx={{ maxWidth: 200, marginY: 2, marginX: 2 }}
                    >
                      <Link to={`/album/${album.albumResponse.id}`}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="200"
                            image={album.albumResponse.images[0].url}
                            alt={`Cover of the track "${album.albumResponse.name}"`}
                          />
                          <CardContent sx={{ padding: 2 }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {album.albumResponse.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {getAllArtists(album.albumResponse.artists)}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Link>
                    </Card>
                  ))}
                </Box>
                <h2 style={sectionHeadingStyle}>All Tracks</h2>
                <Box
                  display="flex"
                  justifyContent="justify-start"
                  flexWrap="wrap"
                >
                  {tracks.map((track, index) => (
                    <Card
                      key={index}
                      sx={{ maxWidth: 200, marginY: 2, marginX: 2 }}
                    >
                      <Link to={`/song/${track.trackResponse.id}`}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="200"
                            image={track.trackResponse.album.images[0].url}
                            alt={`Cover of the track "${track.trackResponse.name}"`}
                          />
                          <CardContent sx={{ padding: 2 }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {track.trackResponse.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {track.trackResponse.artists[0].name}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Link>
                    </Card>
                  ))}
                </Box>
              </section>
            )}
          </div>
        </div>
        <footer></footer>
      </div>
    </Fade>
  );
}

export default Profile;
