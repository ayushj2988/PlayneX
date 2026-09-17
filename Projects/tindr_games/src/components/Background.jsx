import React from 'react';
import './Background.css';

export default function Background({ imageUrl, accentColor, gameTitle }) {
  return (
    <div className="background-container">
      <div 
        className="background-image" 
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      {gameTitle && (
        <div className="background-title-wrapper">
          <div className="background-text">
            {gameTitle.toUpperCase()}
          </div>
          <div className="background-text outline">
            {gameTitle.toUpperCase()}
          </div>
        </div>
      )}
      <div className="background-overlay" />
      {accentColor && (
        <div 
          className="background-tint" 
          style={{ backgroundColor: accentColor }}
        />
      )}
      <div className="background-grain" />
    </div>
  );
}
