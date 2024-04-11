import React, { useState, useEffect }from 'react'
import SongDisplay from '../components/SongDisplay'
import {getOneTrack} from '../services/Spotify'

function Song() {
  const [songInfo, setSongInfo] = useState(null);
  // title variable for later
  const songTitle = "Slow Dancing in the Dark"; 

  useEffect(() => {
    const fetchSongInfo = async () => {
      try {
        const trackData = await getOneTrack(songTitle);
        setSongInfo(trackData)
      } catch (error) {
        console.error("Error fetching song info:", error);
      }
    };

    fetchSongInfo();
  }, [songTitle]); 

  return (
    <>
    <SongDisplay props={songInfo}/>
    </>
  )
}

export default Song