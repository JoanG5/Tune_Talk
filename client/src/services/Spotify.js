import axios from "axios";

export const getToken = async () => {
  const authParameters = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const requestBody = new URLSearchParams();
  requestBody.append("grant_type", "client_credentials");
  requestBody.append("client_id", process.env.SPOTIFY_CLIENT_ID);
  requestBody.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET);

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      requestBody,
      authParameters
    );
    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
};

const token = await getToken();

const searchParameters = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const getArtist = async (search) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${search}&type=artist`,
      searchParameters
    );
    const artistId = response.data.artists.items[0].id;
    const albumsResponse = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      searchParameters
    );
    const topTracksResponse = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
      searchParameters
    );

    const albums = albumsResponse.data.items;
    const allTracks = [];

    for (const album of albums) {
      const tracksResponse = await axios.get(
        `https://api.spotify.com/v1/albums/${album.id}/tracks`,
        searchParameters
      );

      const tracks = tracksResponse.data.items;
      allTracks.push(...tracks);
    }

    return {
      name: response.data.artists.items[0].name,
      albums: albumsResponse.data.items,
      tracks: allTracks,
      topTracks: topTracksResponse.data.tracks,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAlbums = async (search) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${search}&type=artist`,
      searchParameters
    );
    const artistId = response.data.artists.items[0].id;

    const albumsResponse = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      searchParameters
    );
    return albumsResponse.data.items;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getOneAlbum = async (search) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${search}&type=album`,
      searchParameters
    );
    const albumId = response.data.albums.items[0].id;
    const albumResponse = await axios.get(
      `https://api.spotify.com/v1/albums/${albumId}`,
      searchParameters
    );
    return albumResponse.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getOneTrack = async (search) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${search}&type=track`,
      searchParameters
    );
    const trackId = response.data.tracks.items[0].id;
    const trackResponse = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      searchParameters
    );
    // console.log(trackResponse.data);
    return trackResponse.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getOneTrackId = async (id) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${id}`,
      searchParameters
    );
    const trackData = response.data;
    return trackData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getTrackDataFromDB = async (tracks) => {
  const trackData = [];
  for (const track of tracks) {
    const trackId = track.spotify_id;
    const trackResponse = await getOneTrackId(trackId);
    trackResponse.db_id = track.song_id;
    trackData.push(trackResponse);
  }
  return trackData;
};

export const getOneAlbumId = async (id) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${id}`,
      searchParameters
    );
    const albumData = response.data;
    return albumData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAlbumDataFromDB = async (albums) => {
  const albumData = [];
  for (const album of albums) {
    const albumId = album.spotify_id;
    const albumResponse = await getOneAlbumId(albumId);
    albumResponse.db_id = album.album_id;
    albumData.push(albumResponse);
  }
  return albumData;
};

export const testData = async () => {
  const data = [];
  data.push(await getOneTrack("Slow Dancing in the Dark"));
  data.push(await getOneTrack("Glimpse of us"));
  data.push(await getOneTrack("Will He"));
  return data;
};

export const testAlbumData = async () => {
  const data = [];
  data.push(await getOneAlbum("Nectar"));
  data.push(await getOneAlbum("In Tongues"));
  data.push(await getOneAlbum("Ballads 1"));
  data.push(await getOneAlbum("We Dont Trust You"));
  data.push(await getOneAlbum("We Still Dont Trust You"));
  data.push(await getOneAlbum("2093"));
  data.push(await getOneAlbum("Utopia"));
  data.push(await getOneAlbum("Heavens knows pinkpantheress"));
  data.push(await getOneAlbum("Scrapyard"));
  return data;
};

export const testCurrAlbumData = async () => {
  const data = [];
  data.push(await getOneAlbum("We Dont Trust You"));
  return data;
};
