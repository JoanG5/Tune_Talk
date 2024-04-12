import React, { useState, useEffect }from 'react'
import SongDisplay from '../components/SongDisplay'
import ReviewList from '../components/Reviews';
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
    <div>
      <SongDisplay props={songInfo}/>
      
      <ReviewList reviews={[]}/>
    </div>
  )
}

export default Song