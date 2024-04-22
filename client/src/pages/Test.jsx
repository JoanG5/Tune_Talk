import React, { useEffect, useState } from "react";
import {
  getArtist,
  getAlbums,
  getOneAlbum,
  getOneTrack,
} from "../services/Spotify";

function Test() {
  const [artist, setArtist] = useState({});
  const [albums, setAlbums] = useState([]);

  const searchArtist = async () => {
    try {
      const artist = await getArtist("Joji");
      console.log(artist);
      setArtist(artist);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  const searchAlbums = async () => {
    try {
      const albums = await getAlbums("Joji");
      console.log(albums);
      setAlbums(albums);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  const searchOneAlbum = async () => {
    try {
      const album = await getOneAlbum("Nectar");
      console.log(album);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  const searchOneTrack = async () => {
    try {
      const track = await getOneTrack("Slow Dancing in the Dark");
      console.log(track);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  useEffect(() => {
    searchArtist();
    // searchAlbums();
    // searchOneAlbum();
    // searchOneTrack();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">{artist.name}</h1>
      <h1 className="text-3xl font-bold underline">Albums:</h1>
      <ul>
        {artist.albums &&
          artist.albums.map((album) => <li key={album.id}>{album.name}</li>)}
      </ul>
      <h1 className="text-3xl font-bold underline">Top Tracks:</h1>
      <ul>
        {artist.topTracks &&
          artist.topTracks.map((track) => <li key={track.id}>{track.name}</li>)}
      </ul>
      <h1 className="text-3xl font-bold underline">All Tracks:</h1>
      <ul>
        {artist.tracks &&
          artist.tracks.map((track) => <li key={track.id}>{track.name}</li>)}
      </ul>
    </div>
  );
}

export default Test;
