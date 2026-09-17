import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './GameCard.css';

const PlatformIcon = ({ platform }) => {
  if (platform === 'Windows') return <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/></svg>;
  if (platform === 'macOS' || platform === 'Mac') return <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M14.07 4.24c.72-1 1.2-2.39 1-3.79-1.2.06-2.65.86-3.48 1.83-.71.84-1.26 2.29-1 3.65 1.34.1 2.68-.7 3.48-1.69zm.87 2.45c-1.8-1.07-3.92-.37-4.8.1-1.03.53-2.18.53-3.2 0-1-.53-2.67-1.12-4.2-.1-1.78 1.14-3.08 3.56-1.5 6.47C2.26 15.07 4 19.33 5.96 19.33c1.02 0 1.5-.7 2.84-.7 1.34 0 1.82.7 2.84.7 1.93 0 3.5-3.84 4.54-5.5.9-.62 1.4-1.55 1.5-2.5-.03-.02-1.75-.68-1.75-2.73 0-1.8 1.4-2.86 1.42-2.87-.8-1.15-2.15-1.34-2.4-1.34z"/></svg>;
  if (platform === 'Linux') return <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M11 20c-1-1-2-1-2-2 0-1.5 1-2 2-2s2 .5 2 2c0 1-1 1-2 2zm1-5c-2 0-4-.5-4-2 0-1 1-2 2-2h4c1 0 2 1 2 2 0 1.5-2 2-4 2zm2-5c0 1-1 2-2 2s-2-1-2-2 1-2 2-2 2 1 2 2z"/></svg>;
  return null;
}

export default function GameCard({ game, onSwipe, dragEnabled = true, isActive = true }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  
  if (!game) return null;

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 100;
    if (info.offset.y < -swipeThreshold) {
      y.set(0);
      x.set(0);
      onSwipe('up');
    } else if (info.offset.x > swipeThreshold) {
      x.set(0);
      y.set(0);
      onSwipe('right');
    } else if (info.offset.x < -swipeThreshold) {
      x.set(0);
      y.set(0);
      onSwipe('left');
    }
  };

  return (
    <motion.div 
      layout
      layoutId={`game-card-${game.id}`}
      className="game-card"
      style={{ x, y, rotate }}
      drag={dragEnabled ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div 
        className="game-card-artwork" 
        style={{ backgroundImage: `url(${game.image})` }}
      />
      
      <div className="game-card-gradient" />
      
      {isActive && (
        <button className="wishlist-quick-btn" aria-label="Add to Wishlist">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      )}

      <div className="game-card-content">
        <div className="game-card-metadata">
          <div className="genres">
            {game.genres.map(genre => (
              <span key={genre} className="genre-pill">{genre}</span>
            ))}
          </div>
        </div>

        <h1 className="game-title">{game.name}</h1>
        
        <div className="game-price-platform">
          <div className="price-tag" style={{ color: game.accentColor || 'var(--game-accent)' }}>
            {game.price}
          </div>
          <div className="platforms">
            {game.platforms.map(p => <PlatformIcon key={p} platform={p} />)}
          </div>
        </div>
        
        <p className="game-description">
          {game.description}
        </p>
      </div>
    </motion.div>
  );
}
