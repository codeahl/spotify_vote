import React from "react";

const AlbumList = ({ albums }) => {
  return albums.map((album, index) => (
    <div key={album.id}>
      {album.images.length ? (
        <a
          href={`https://open.spotify.com/album/${album.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <img width={"100%"} src={album.images[0].url} alt="" />
        </a>
      ) : (
        <div>No Image</div>
      )}
      <button>{album.name}</button>
    </div>
  ));
};

export default AlbumList;
