import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameDetailsModal from '../components/GameDetailsModal';
import './Wishlist.css';

export default function Wishlist({ wishlist, onRemove, setCurrentPage }) {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>Your Wishlist</h1>
        <p>{wishlist.length} {wishlist.length === 1 ? 'game' : 'games'} saved</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <h2>Your wishlist is empty</h2>
          <p>Discover some games to add them here.</p>
          <button className="back-btn" onClick={() => setCurrentPage('discover')}>
            Back to Discover
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          <AnimatePresence>
            {wishlist.map(game => (
              <motion.div 
                key={game.id}
                layoutId={`wishlist-card-${game.id}`}
                className="wishlist-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedGame(game)}
              >
                <div 
                  className="wishlist-card-bg"
                  style={{ backgroundImage: `url(${game.image})` }}
                />
                <div className="wishlist-card-content">
                  <h3>{game.name}</h3>
                  <p>{game.price}</p>
                </div>
                <button 
                  className="wishlist-remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(game.id);
                  }}
                  aria-label="Remove from wishlist"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

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
