import React from 'react';
import './Navbar.css';

export default function Navbar({ 
  currentPage = 'discover', 
  setCurrentPage = () => {}, 
  searchQuery = '', 
  setSearchQuery = () => {}, 
  activeFilter = 'All', 
  setActiveFilter = () => {},
  genres = []
}) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Playne<span className="logo-accent">X</span>
      </div>
      
      <div className="navbar-links">
        <button 
          className={`nav-link ${currentPage === 'discover' ? 'active' : ''}`}
          onClick={() => setCurrentPage('discover')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Discover
        </button>
        <button 
          className={`nav-link ${currentPage === 'wishlist' ? 'active' : ''}`}
          onClick={() => setCurrentPage('wishlist')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          Wishlist
        </button>
      </div>

      <div className="navbar-actions">
        {currentPage === 'discover' && (
          <>
            <div className="search-bar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                placeholder="Search games..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="filter-dropdown">
              <select 
                value={activeFilter} 
                onChange={(e) => setActiveFilter(e.target.value)}
                className="filter-select"
                aria-label="Filter by genre"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
