import React from "react";

const ArtistList = ({ artists, onArtistClick }) => {
  return artists.map((artist, index) => (
    <div key={artist.id}>
      {artist.images.length ? (
        <a
          href={`https://open.spotify.com/artist/${artist.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <img width={"100%"} src={artist.images[0].url} alt="" />
        </a>
      ) : (
        <div>No Image</div>
      )}
      <button
        onClick={(e) => {
          onArtistClick(index);
        }}
      >
        {artist.name}
      </button>
    </div>
  ));
};

export default ArtistList;
