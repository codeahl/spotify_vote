import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import ArtistList from "./components/ArtistList";
import AlbumList from "./components/AlbumList";
import TrackList from "./components/TrackList";

function App() {
  const CLIENT_ID = "dbf88f9cef4f4ce6ab5486db9b0400ba";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [view, setView] = useState("main");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    setArtists(data.artists.items);
  };

  // const renderArtists = () => {
  //   const artistMap = artists.map((artist, index) => (
  //     <div key={artist.id}>
  //       {artist.images.length ? (
  //         <a
  //           href={`https://open.spotify.com/artist/${artist.id}`}
  //           target="_blank"
  //           rel="noreferrer"
  //         >
  //           <img width={"100%"} src={artist.images[0].url} alt="" />
  //         </a>
  //       ) : (
  //         <div>No Image</div>
  //       )}
  //       <button
  //         key={artist.id}
  //         onClick={(e) => handleArtistButtonClick(e, index)}
  //       >
  //         {artist.name}
  //       </button>
  //     </div>
  //   ));
  // };

  // const renderTracks = () => {
  //   return tracks.map((track, index) => (
  //     <div key={track.id}>
  //       <button key={track.id}>{track.name}</button>
  //     </div>
  //   ));
  // };

  // const renderAlbums = () => {
  //   return albums.map((album, index) => (
  //     <div key={album.id}>
  //       {album.images.length ? (
  //         <a
  //           href={`https://open.spotify.com/album/${album.id}`}
  //           target="_blank"
  //           rel="noreferrer"
  //         >
  //           <img width={"100%"} src={album.images[0].url} alt="" />
  //         </a>
  //       ) : (
  //         <div>No Image</div>
  //       )}
  //       <button
  //         key={album.id}
  //         onClick={(e) => handleArtistButtonClick(e, index)}
  //       >
  //         {album.name}
  //       </button>
  //     </div>
  //   ));
  // };

  const showArtistSelection = () => {
    setView("artist");
  };

  const showMainPage = () => {
    setView("main");
  };

  const handleArtistButtonClick = (index) => {
    const artistId = artists[index].id;
    getArtistTracks(artistId);
    getArtistAlbums(artistId);
  };

  const getArtistTracks = async (artistId) => {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTracks(data.tracks);
    } catch (error) {
      console.error("Error fetching top tracks:", error);
    }
  };

  const getArtistAlbums = async (artistId) => {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlbums(data.items);
    } catch (error) {
      console.error("Error fetching artist albums:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
        {token ? (
          <form onSubmit={searchArtists}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type={"submit"}>Search</button>
          </form>
        ) : (
          <h2>Please login</h2>
        )}
      </header>
      <ArtistList
        artists={artists}
        onArtistClick={(index) => handleArtistButtonClick(index)}
      />
      <AlbumList albums={albums} />
      <TrackList tracks={tracks} />
    </div>
  );
}

export default App;
