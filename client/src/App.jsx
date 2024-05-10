import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./pages/Test";
import Home from "./pages/Home";
import Album from "./pages/Album";
import Song from "./pages/Song";
import Profile from "./pages/Profile";
import SavedSongs from "./pages/SavedSongs";
import SavedAlbums from "./pages/SavedAlbums";
import Auth0ProviderWithHistory from "./auth0Provider";

function App() {
  return (
    <Auth0ProviderWithHistory>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/album" element={<Album />} />
          <Route path="/song" element={<Song />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/savedsong" element={<SavedSongs />} />
          <Route path="/profile/savedalbum" element={<SavedAlbums />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </Auth0ProviderWithHistory>
  );
}

export default App;
