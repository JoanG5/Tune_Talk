// import SpotifyWebApi from "spotify-web-api-js";

// const spotifyApi = new SpotifyWebApi();
// const clientId = process.env.SPOTIFYCLIENTID;
// const clientSecret = process.env.SPOTIFYCLIENTSECRET;
// const redirectUri = "http://localhost:5173/callback";

// const scopes = ["user-read-private", "user-read-email", "user-library-read"];

// const spotifyAuthService = {
//   getAuthorizationUrl: () => {
//     return `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
//       scopes.join(" ")
//     )}&response_type=code`;
//   },

//   getTokenFromCode: async (code) => {
//     const response = await fetch("https://accounts.spotify.com/api/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
//       },
//       body: new URLSearchParams({
//         grant_type: "authorization_code",
//         code,
//         redirect_uri: redirectUri,
//       }),
//     });

//     return response.json();
//   },

//   setAccessToken: (accessToken) => {
//     spotifyApi.setAccessToken(accessToken);
//   },

//   spotifyApi,
// };

// export default spotifyAuthService;
import SpotifyWebApi from "spotify-web-api-js";

const SpotifyService = {
  spotifyApi: new SpotifyWebApi(),

  searchTracks: async (query) => {
    try {
      const response = await SpotifyService.spotifyApi.searchTracks(query);
      return response.tracks.items;
    } catch (error) {
      console.error("Error searching for tracks:", error);
      throw error;
    }
  },

  setAccessToken: (accessToken) => {
    SpotifyService.spotifyApi.setAccessToken(accessToken);
  },
};
export default SpotifyService;
