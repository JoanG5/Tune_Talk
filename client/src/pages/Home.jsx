import React, { useState } from "react";
import Spotify from "../services/Spotify";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const tracks = await Spotify.searchTracks(searchQuery);
      setSearchResults(tracks);
    } catch (error) {
      console.error("Error searching for tracks:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a song"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((track) => (
          <li key={track.id}>
            {track.name} by{" "}
            {track.artists.map((artist) => artist.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
