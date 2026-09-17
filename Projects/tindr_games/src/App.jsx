import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Discover from './pages/Discover';
import Wishlist from './pages/Wishlist';
import { mockGames } from './data/games';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('discover'); // 'discover', 'wishlist'
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Extract all unique genres for the filter dropdown
  const allGenres = ['All', ...new Set(mockGames.flatMap(g => g.genres))].sort();

  const handleAddToWishlist = (game) => {
    if (!wishlist.find(g => g.id === game.id)) {
      setWishlist(prev => [...prev, game]);
    }
  };

  const handleRemoveFromWishlist = (gameId) => {
    setWishlist(prev => prev.filter(g => g.id !== gameId));
  };

  return (
    <div className="app-container">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        genres={allGenres}
      />
      
      {currentPage === 'discover' && (
        <Discover 
          gamesData={mockGames}
          searchQuery={searchQuery}
          activeFilter={activeFilter}
          onWishlist={handleAddToWishlist}
        />
      )}
      
      {currentPage === 'wishlist' && (
        <Wishlist 
          wishlist={wishlist} 
          onRemove={handleRemoveFromWishlist}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default App;
