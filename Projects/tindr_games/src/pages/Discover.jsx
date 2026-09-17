import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import GameCarousel from '../components/GameCarousel';
import SwipeControls from '../components/SwipeControls';
import GameDetailsModal from '../components/GameDetailsModal';
import './Discover.css';

export default function Discover({ gamesData, searchQuery, activeFilter, onWishlist }) {
  const [gamesQueue, setGamesQueue] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);
  const audioRef = useRef(null);

  // Apply filters (Genre)
  useEffect(() => {
    let filtered = gamesData;
    if (activeFilter !== 'All') {
      filtered = filtered.filter(g => g.genres.includes(activeFilter));
    }
    setGamesQueue(filtered);
    setActiveIndex(0); // Reset index when genre filter changes
  }, [gamesData, activeFilter]);

  // Apply search (Jump to game with scroll animation)
  useEffect(() => {
    if (searchQuery) {
      const matchIndex = gamesQueue.findIndex(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()));
      if (matchIndex !== -1) {
        setActiveIndex(matchIndex);
      }
    }
  }, [searchQuery, gamesQueue]);

  const currentGame = gamesQueue[activeIndex];

  const handleSwipe = (direction) => {
    if (direction === 'up') {
      handleDetails();
    } else if (direction === 'left') {
      // Swiping left moves to the next game
      if (activeIndex < gamesQueue.length - 1) {
        setActiveIndex(prev => prev + 1);
      }
    } else if (direction === 'right') {
      // Swiping right moves to the previous game
      if (activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
    }
  };

  const handlePass = () => handleSwipe('left');
  
  const handleWishlist = () => {
    if (currentGame) {
      onWishlist(currentGame);
      handleSwipe('left'); // Advance to next game
    }
  };
  
  const handleDetails = () => {
    setSelectedGame(currentGame);
  };

  const handleIndexChange = (newIndex) => {
    if (newIndex >= 0 && newIndex < gamesQueue.length) {
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    if (currentGame?.accentColor) {
      document.documentElement.style.setProperty('--game-accent', currentGame.accentColor);
    } else {
      document.documentElement.style.setProperty('--game-accent', '#f37021');
    }
    
    // Play theme audio
    if (audioRef.current && currentGame?.audio) {
      audioRef.current.src = currentGame.audio;
      audioRef.current.volume = 0.3; // keep it subtle in the background
      audioRef.current.play().catch(err => {
        console.log("Audio autoplay prevented by browser. User must interact first:", err);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentGame]);

  // Lock body scroll and handle audio when modal is open
  useEffect(() => {
    if (selectedGame) {
      document.body.style.overflow = 'hidden';
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      document.body.style.overflow = 'unset';
      if (audioRef.current && currentGame?.audio) {
        audioRef.current.play().catch(e => console.log('Autoplay prevented', e));
      }
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedGame, currentGame]);

  return (
    <div className="discover-page">
      <audio ref={audioRef} loop />
      
      <div className="background-wrapper">
        <AnimatePresence mode="popLayout">
          {currentGame && (
            <motion.div
              key={currentGame.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, willChange: 'opacity' }}
            >
              <Background 
                imageUrl={currentGame.image} 
                accentColor={currentGame.accentColor} 
                gameTitle={currentGame.name}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="discover-side-text left">
        <div className="top">
          <p>DISCOVER</p>
          <p>GAMES</p>
          <p>DIFFERENTLY</p>
          <div className="sub-wrap">
            <p className="sub">Swipe. Explore.</p>
            <p className="sub">Find your next obsession.</p>
          </div>
        </div>
        <div className="bottom">
          <p className="sub">Play more.</p>
          <p className="sub">Scroll less.</p>
        </div>
      </div>
      
      <div className="discover-side-text right">
        <div className="top">
          <p>SAME</p>
          <p>GAMES.</p>
          <p>NEW</p>
          <p>PERSPECTIVE.</p>
        </div>
        <div className="bottom">
          <p className="sub">For gamers</p>
          <p className="sub">by gamers.</p>
        </div>
      </div>

      <main className="discover-main">
        {currentGame ? (
          <div className="discover-content">
            <div className="card-stack-container">
              <GameCarousel 
                games={gamesQueue} 
                activeIndex={activeIndex} 
                onIndexChange={handleIndexChange} 
                onSwipe={handleSwipe} 
              />
            </div>
            
            <SwipeControls 
              onPass={handlePass}
              onWishlist={handleWishlist}
              onDetails={handleDetails}
            />
          </div>
        ) : (
          <div className="empty-state">
            <h2>That's all for now.</h2>
            <p>You've seen all the games in your discovery queue.</p>
            <div className="empty-actions">
              <button className="empty-btn primary">Review Wishlist</button>
              <button className="empty-btn secondary">Adjust Filters</button>
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedGame && (
          <GameDetailsModal 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
