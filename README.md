<!-- TABLE OF CONTENTS -->
<a name="readme-top"></a>
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
        <li><a href="#technologies-used">Technologies Used</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

# Tune Talk

TuneTalk will allow users to share their thoughts on music and keep track of the songs or albums they plan on or are currently listening to. It will allow users to give songs or albums a rating out of 5 alongside a title and description describing their thoughts in depth. As well, users will be able to save songs and albums to a “plan to listen”, “listening” or “listened” section that is saved to their profile. Users will also be able to create a unique personalized AI song using their previous reviews as input to tailor the song to their musical tastes and preferences.

<!-- ABOUT THE PROJECT -->
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## About The Project

<h1 align="center">
  <div align="left">
    <h5>Home Page</h5>
    <img src="client\src\assets\MusicReviewApp_HomePage.gif" alt="MusicReviewApp Home Page">
  </div>
  <div align="left">
    <h5>Get Song</h5>
    <img src="client\src\assets\MusicReviewApp_GetSong.gif" alt="MusicReviewApp Get Song">
  </div>
  <div align="left">
    <h5>Song Update</h5>
    <img src="client\src\assets\MusicReviewApp_UpdateSong.gif" alt="MusicReviewApp Song Update">
  </div>
  <div align="left">
    <h5>Album Update</h5>
    <img src="client\src\assets\MusicReviewApp_UpdateAlbum.gif" alt="MusicReviewApp Album Update">
  </div>
  <div align="left">
    <h5>Profile</h5>
    <img src="client\src\assets\MusicReviewApp_Profile.gif" alt="MusicReviewApp Profile">
  </div>
  <div align="left">
    <h5>Generate Custom Songs</h5>
    <img src="client\src\assets\MusicReviewApp_SongGeneration.gif" alt="MusicReviewApp Home Page">
  </div>
  <div align="left">
    <h5>View Custom Songs</h5>
    <img src="client\src\assets\MusicReviewApp_CustomSongView.gif" alt="MusicReviewApp Home Page">
  </div>
</h1>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TECHNOLOGIES USED -->
## Technologies Used

- [![React][React.js]][React-url]
- [![Express][Express]][Express-url]
- [![PostgreSQL][PostgreSQL]][PostgreSQL-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

For this project you will need Node.js and PostgreSQL installed

### Prerequisites

1. Download and install Node.js on your system. You can download it from [Node.js Official Site](https://nodejs.org/en).

2. Download and install PostgreSQL on your system. You can download it from [PostgreSQL Official Site](https://www.postgresql.org/download/).

3. Install npm on to your system.
  ```
  npm install npm@latest -g
  ```
  
4. Create a Spotify application from the [Spotify Developer Site](https://developer.spotify.com/)

5. Create a Auth0 application from the [Auth0 Official Site](https://auth0.com//)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/JoanG5/Tune_Talk.git
   ```
2. Install NPM packages
   ```sh
   cd client
   npm install
   cd server
   npm install
   ```
3. Create a .env in the root of the client folder
   ```js
   SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_ID
   SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_SECRET_ID
   REACT_APP_AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
   REACT_APP_AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

- Team members who contributed to this project:
  - [Angelo Vitalino](https://github.com/angvit)
  - [Daniel Samborski](https://github.com/popki222)
  - [Jerome Galam](https://github.com/jgalam)
  - [Joan Guzman](https://github.com/JoanG5)
  - [Paulo Xu](https://github.com/pauloxx)

[React.js]: https://img.shields.io/badge/react-000000?style=for-the-badge&logo=react&link=https%3A%2F%2Freact.dev%2F
[React-url]: https://reactjs.org/
[Express]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&link=https%3A%2F%2Fexpressjs.com%2F
[Express-url]: https://expressjs.com/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-000000?style=for-the-badge&logo=PostgreSQL&link=https%3A%2F%2Fwww.postgresql.org%2F
[PostgreSQL-url]: https://postgresql.org

<p align="right">(<a href="#readme-top">back to top</a>)</p>
