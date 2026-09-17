import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './GameDetailsModal.css';

const PlatformIcon = ({ platform }) => {
  if (platform === 'Windows') return <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/></svg>;
  if (platform === 'macOS' || platform === 'Mac') return <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M14.07 4.24c.72-1 1.2-2.39 1-3.79-1.2.06-2.65.86-3.48 1.83-.71.84-1.26 2.29-1 3.65 1.34.1 2.68-.7 3.48-1.69zm.87 2.45c-1.8-1.07-3.92-.37-4.8.1-1.03.53-2.18.53-3.2 0-1-.53-2.67-1.12-4.2-.1-1.78 1.14-3.08 3.56-1.5 6.47C2.26 15.07 4 19.33 5.96 19.33c1.02 0 1.5-.7 2.84-.7 1.34 0 1.82.7 2.84.7 1.93 0 3.5-3.84 4.54-5.5.9-.62 1.4-1.55 1.5-2.5-.03-.02-1.75-.68-1.75-2.73 0-1.8 1.4-2.86 1.42-2.87-.8-1.15-2.15-1.34-2.4-1.34z"/></svg>;
  if (platform === 'Linux') return <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11 20c-1-1-2-1-2-2 0-1.5 1-2 2-2s2 .5 2 2c0 1-1 1-2 2zm1-5c-2 0-4-.5-4-2 0-1 1-2 2-2h4c1 0 2 1 2 2 0 1.5-2 2-4 2zm2-5c0 1-1 2-2 2s-2-1-2-2 1-2 2-2 2 1 2 2z"/></svg>;
  return null;
}

export default function GameDetailsModal({ game, onClose }) {
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (iframeRef.current) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      iframeRef.current.contentWindow.postMessage(`{"event":"command","func":"${command}","args":""}`, '*');
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (iframeRef.current) {
      const command = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(`{"event":"command","func":"${command}","args":""}`, '*');
      setIsMuted(!isMuted);
    }
  };

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!game) return null;

  return (
    <div className="game-details-overlay">
      <div className="game-details-backdrop" onClick={onClose} />
      
      <motion.div 
        layout
        layoutId={`game-card-${game.id}`}
        className="game-details-modal"
      >
        <button className="game-details-close" onClick={onClose} aria-label="Close details">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="details-hero">
          {game.trailer ? (
            <div className="details-hero-bg video-container">
              <iframe 
                ref={iframeRef}
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${game.trailer}?autoplay=1&mute=0&controls=0&modestbranding=1&enablejsapi=1`}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                style={{ pointerEvents: 'none' }}
              ></iframe>
              <div className="custom-video-controls">
                <button className="video-control-btn" onClick={togglePlay} aria-label="Play/Pause">
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  )}
                </button>
                <button className="video-control-btn" onClick={toggleMute} aria-label="Mute/Unmute">
                  {isMuted ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div 
              className="details-hero-bg"
              style={{ backgroundImage: `url(${game.background || game.image})` }}
            />
          )}
          <div className="details-hero-gradient" />
          
          <div className="details-hero-content">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="details-genres">
                {game.genres.map(genre => (
                  <span key={genre} className="genre-pill">{genre}</span>
                ))}
              </div>
              <h1 className="details-title">{game.name}</h1>
              <div className="details-price-platform">
                <span className="details-price" style={{ color: game.accentColor || 'var(--game-accent)' }}>
                  {game.price}
                </span>
                <div className="details-platforms">
                  {game.platforms.map(p => <PlatformIcon key={p} platform={p} />)}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="details-body">
          <motion.div 
            className="details-metadata"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="meta-item">
              <span className="meta-label">Release Date</span>
              <span className="meta-value">{game.releaseDate}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Developer</span>
              <span className="meta-value">{game.developer}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Publisher</span>
              <span className="meta-value">{game.publisher}</span>
            </div>
          </motion.div>

          <motion.div 
            className="details-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3>About this game</h3>
            <p>{game.description}</p>
          </motion.div>
          
          <motion.div 
            className="details-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button className="details-wishlist-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              Add to Wishlist
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
