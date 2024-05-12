import React, { useState, useEffect }from 'react'
import ReviewList from '../components/Reviews';
import { getOneAlbum } from '../services/Spotify'
import AlbumDisplay from '../components/AlbumPage/AlbumDisplay';

function Album() {
  const [AlbumInfo, setAlbumInfo] = useState(null);
  const albumTitle = "Nectar"; 

  useEffect(() => {
    const fetchAlbumInfo = async () => {
      try {
        const trackData = await getOneAlbum(albumTitle);
        setAlbumInfo(trackData)
      } catch (error) {
        console.error("Error fetching album info:", error);
      }
    };

    fetchAlbumInfo();
  }, [albumTitle]); 

  return (
    <div>
      <AlbumDisplay props={AlbumInfo}/>
      
      <ReviewList reviews={[0]}/>
    </div>
  )
}

export default Album
