import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./pages/Test";
import Home from "./pages/Home";
import Album from "./pages/Album";
import Song from "./pages/Song";
import Profile from "./pages/Profile";
import SavedSongs from "./pages/SavedSongs";
import SavedAlbum from "./pages/SavedAlbum";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/album" element={<Album />} />
        <Route path="/song" element={<Song />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/savedsong" element={<SavedSongs />} />
        <Route path="/profile/savedalbum" element={<SavedAlbum />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;