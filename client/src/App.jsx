import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./pages/Test";
import Home from "./pages/Home";
import Album from "./pages/Album";
import Song from "./pages/Song";
import Profile from "./pages/Profile";
import SavedSongs from "./pages/SavedSongs";
import SavedAlbums from "./pages/SavedAlbums";
import Navbar from "./components/Navbar/Navbar";
import Loading from "./components/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";
import Home2 from "./pages/Home2";
import NotFound from "./pages/NotFound";
import LoggedIn from "./components/LoggedIn";
import Footer from "./components/Footer";

function App() {
  const { isLoading, error } = useAuth0();
  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "light" : "dark",
    },
  });

  const handleDarkModeChange = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {error && <div> There is an Error: {error.message}</div>}
        {!error && isLoading && <Loading />}
        {!error && !isLoading && (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home2 />} />
              <Route path="/album/:albumId" element={<Album />} />
              <Route path="/song/:songId" element={<Song />} />
              <Route element={<LoggedIn />} path="/">
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/profile/savedsong" element={<SavedSongs />} />
                <Route path="/profile/savedalbum" element={<SavedAlbums />} />
              </Route>
              {/* <Route path="/test" element={<Test />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        )}
        <Box sx={{ position: "fixed", right: 20, bottom: 20 }}>
          <FormControlLabel
            control={
              <Switch checked={darkMode} onChange={handleDarkModeChange} />
            }
          />
        </Box>
        {/* <Footer /> */}
      </ThemeProvider>
    </Router>
  );
}

export default App;
