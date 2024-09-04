import React from "react";
// import "../styles/Overlay.css";

const Overlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div class="overlay" onClick={onClose}>
      <div class="overlay-content" onClick={(e) => e.stopPropagation()}>
        <span class="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>Overlay Title</h2>
        <p>
          This is an overlay box that appears on top of the rest of the page.
        </p>
      </div>
    </div>
  );
};

export default Overlay;
