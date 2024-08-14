import React from "react";

const TrackList = ({ tracks }) => {
  return tracks.map((track) => (
    <div key={track.id}>
      <button>{track.name}</button>
    </div>
  ));
};

export default TrackList;
