import React, { useState, useEffect }from 'react'
import SongDisplay from '../components/SongPage/SongDisplay'
import ReviewList from '../components/Reviews';
import {getOneTrack} from '../services/Spotify'

function Song() {
  const [songInfo, setSongInfo] = useState(null);
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
    <div>
      <SongDisplay props={songInfo}/>
      
      <ReviewList reviews={[0]}/>
    </div>
  )
}

export default Song